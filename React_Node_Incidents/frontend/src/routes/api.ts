import axios from "axios";
import type { Incident } from "../types/tipos";


const api = axios.create({
    baseURL: "http://localhost:4000/api/incidents",
    timeout: 5000
});


export const getIncidents = async (): Promise<Incident[]> => {
    const res = await api.get("/");
    return res.data.data;
};


export const createIncident = async (data: any) => {
    const res = await api.post("/", data);
    return res.data;
};


export const updateEstado = async (id: string, estado: string) => {
    const res = await api.put(`/${id}/estado`, { estado });
    return res.data;
};


export const deleteIncidentApi = async (id: string) => {
    const res = await api.delete(`/${id}`);
    return res.data;
};