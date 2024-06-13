import clienteAxios from "./Axios";
import Producto from "../partials/model/producto.model";

export const verProductos = async (): Promise<Producto[]> => {
    try {
        const response = await clienteAxios.get('/producto');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};