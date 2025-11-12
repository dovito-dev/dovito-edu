import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const isAdmin = await storage.isUserAdmin(req.session.userId);
  if (!isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
}
