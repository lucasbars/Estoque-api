import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class RawMaterialController {
  static async getAll(req: Request, res: Response) {
    try {
      const rawMaterials = await prisma.rawMaterial.findMany();
      res.json(rawMaterials);
    } catch (error) {
      res.status(500).json({ error: "Error fetching raw materials" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const rawMaterial = await prisma.rawMaterial.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (!rawMaterial)
        return res.status(404).json({ error: "Raw material not found" });
      res.json(rawMaterial);
    } catch (error) {
      res.status(500).json({ error: "Error fetching raw material" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, stock } = req.body;
      const rawMaterial = await prisma.rawMaterial.create({
        data: { name, stock },
      });
      res.status(201).json(rawMaterial);
    } catch (error) {
      res.status(500).json({ error: "Error creating raw material" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { name, stock } = req.body;
      const rawMaterial = await prisma.rawMaterial.update({
        where: { id: Number(req.params.id) },
        data: { name, stock },
      });
      res.json(rawMaterial);
    } catch (error) {
      res.status(500).json({ error: "Error updating raw material" });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await prisma.rawMaterial.delete({
        where: { id: Number(req.params.id) },
      });
      res.json({ message: "Raw material deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting raw material" });
    }
  }
}
