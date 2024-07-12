import clienteAxios from "./Axios";

export const verCompra = async (): Promise<any[]> => {
    try {
        const response = await clienteAxios.get('/compra');
        return response.data;
    } catch (error) {
        console.error("ERROR", error);
        return [];
    }
};
