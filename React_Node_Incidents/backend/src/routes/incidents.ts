import { Router, Request, Response } from "express";
import Incident from "../models/Incident";

const router = Router();


// GET /api/incidents → obtener todos los incidentes
router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await Incident.find().sort({ fechaCreacion: -1 });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener incidentes" });
    }
});
// POST /api/incidents → crear incidente
router.post("/", async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion, categoria, prioridad } = req.body;

        // Validaciones básicas
        if (!titulo || !descripcion || !categoria || !prioridad) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios"
            });
        }

        if (descripcion.length < 10) {
            return res.status(400).json({
                success: false,
                message: "La descripción debe tener al menos 10 caracteres"
            });
        }

        const incident = new Incident({
            titulo,
            descripcion,
            categoria,
            prioridad
        });

        await incident.save();

        res.status(201).json({
            success: true,
            message: "Incidente creado correctamente",
            data: incident
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear incidente" });
    }
});


// PUT /api/incidents/:id/estado → actualizar estado
router.put("/:id/estado", async (req: Request, res: Response) => {
    try {
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({
                success: false,
                message: "Debe indicar el estado"
            });
        }

        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incidente no encontrado"
            });
        }

        // Regla de negocio: no modificar si está resuelto
        if (incident.estado === "resuelto") {
            return res.status(400).json({
                success: false,
                message: "No se puede modificar un incidente resuelto"
            });
        }

        incident.estado = estado;

        if (estado === "resuelto") {
            incident.fechaCierre = new Date();
        }

        await incident.save();

        res.json({
            success: true,
            message: "Estado actualizado correctamente",
            data: incident
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar estado" });
    }
});


// DELETE /api/incidents/:id → eliminar incidente
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incidente no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Incidente eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar incidente" });
    }
});

export default router;
