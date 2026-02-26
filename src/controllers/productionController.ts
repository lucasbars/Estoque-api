import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class ProductionController {
  static async getSuggestion(req: Request, res: Response) {
    try {
      // Busca todos os produtos ordenados por valor (maior primeiro)
      const products = await prisma.product.findMany({
        orderBy: { value: "desc" },
        include: {
          rawMaterials: {
            include: { rawMaterial: true },
          },
        },
      });

      // Copia o estoque atual para simular o consumo
      const allRawMaterials = await prisma.rawMaterial.findMany();
      const stockMap: Record<number, number> = {};
      allRawMaterials.forEach((rm) => {
        stockMap[rm.id] = Number(rm.stock);
      });

      const suggestion = [];

      for (const product of products) {
        // Ignora produtos sem matérias-primas associadas
        if (product.rawMaterials.length === 0) continue;

        // Calcula quantas unidades podem ser produzidas
        let maxQuantity: number = Infinity;

        for (const prm of product.rawMaterials) {
          const available = stockMap[prm.rawMaterialId] ?? 0;
          const needed = Number(prm.quantity);
          const canProduce = Math.floor(available / needed);
          if (canProduce < maxQuantity) {
            maxQuantity = canProduce;
          }
        }

        if (maxQuantity === 0 || maxQuantity === Infinity) continue;

        // Consome o estoque simulado
        for (const prm of product.rawMaterials) {
          const current = stockMap[prm.rawMaterialId] ?? 0;
          stockMap[prm.rawMaterialId] =
            current - maxQuantity * Number(prm.quantity);
        }

        suggestion.push({
          productId: product.id,
          productName: product.name,
          value: Number(product.value),
          quantity: maxQuantity,
          totalValue: Number(product.value) * maxQuantity,
        });
      }

      const grandTotal = suggestion.reduce(
        (sum, item) => sum + item.totalValue,
        0,
      );

      res.json({ suggestion, grandTotal });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error calculating production suggestion" });
    }
  }
}
