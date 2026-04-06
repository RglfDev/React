import { createContext, useEffect } from "react";
import type { Incident } from "../types/tipos";
import React from "react";
import {
  createIncident,
  deleteIncidentApi,
  getIncidents,
  updateEstado,
} from "../routes/api";

interface IncidentContextProps {
  incidents: Incident[];
  loading: boolean;
  errors: string | null;
  success: string;
  deleteId: string | null;
  setDeleteId: (id: string | null) => void;
  loadIncidents: () => Promise<void>;
  handleCreate: (form: any) => Promise<void>;
  changeEstado: (id: string, estado: string) => Promise<void>;
  deleteIncident: (id: string) => Promise<void>;
}

const IncidentContext = createContext<IncidentContextProps | undefined>(
  undefined,
);

export const useIncident = () => {
  const context = React.useContext(IncidentContext);
  if (!context)
    throw new Error("useIncident must be used within a IncidentProvider");
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const IncidentProvider: React.FC<Props> = ({ children }: Props) => {
  const [incidents, setIncidents] = React.useState<Incident[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string | null>("");
  const [success, setSuccess] = React.useState<string>("");
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    } catch (error: any) {
      setErrors(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (form: any) => {
    setErrors("");
    setSuccess("");
    try {
      setLoading(true);
      const res = await createIncident(form);
      if (!res.success) setErrors(res.message);
      else {
        setSuccess(res.message);
        await loadIncidents();
      }
    } catch (error: any) {
      setErrors(error.response?.data?.message || "Error al crear incidencias");
      setLoading(false);
    }
  };

  const changeEstado = async (id: string, estado: string) => {
    try {
      setLoading(true);
      await updateEstado(id, estado);
      loadIncidents();
      setTimeout(() => setLoading(false), 3000);
    } catch (error: any) {
      setErrors(error.response?.data?.message || "Error al actualizar estado");
      setLoading(false);
    }
  };

  const deleteIncident = async (id: string) => {
    try {
      setLoading(true);
      await deleteIncidentApi(id);
      setDeleteId(null);
      await loadIncidents();
      setTimeout(() => setLoading(false), 3000);
    } catch (error: any) {
      setErrors(
        error.response?.data?.message || "Error al eliminar incidencia",
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        loading,
        errors,
        success,
        deleteId,
        setDeleteId,
        loadIncidents,
        handleCreate,
        changeEstado,
        deleteIncident,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};
