import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class ProductController {
  static async getAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        include: {
          rawMaterials: {
            include: { rawMaterial: true },
          },
        },
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          rawMaterials: {
            include: { rawMaterial: true },
          },
        },
      });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error fetching product" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, value, rawMaterials } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          value,
          rawMaterials: {
            create:
              rawMaterials?.map(
                (rm: { rawMaterialId: number; quantity: number }) => ({
                  rawMaterialId: rm.rawMaterialId,
                  quantity: rm.quantity,
                }),
              ) || [],
          },
        },
        include: {
          rawMaterials: {
            include: { rawMaterial: true },
          },
        },
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { name, value, rawMaterials } = req.body;
      const id = Number(req.params.id);

      await prisma.productRawMaterial.deleteMany({ where: { productId: id } });

      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          value,
          rawMaterials: {
            create:
              rawMaterials?.map(
                (rm: { rawMaterialId: number; quantity: number }) => ({
                  rawMaterialId: rm.rawMaterialId,
                  quantity: rm.quantity,
                }),
              ) || [],
          },
        },
        include: {
          rawMaterials: {
            include: { rawMaterial: true },
          },
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await prisma.productRawMaterial.deleteMany({ where: { productId: id } });
      await prisma.product.delete({ where: { id } });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  }
}
