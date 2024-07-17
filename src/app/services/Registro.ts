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


export const registroVenta = async (productoId: any, usuarioId: any) => {
try {
    const response = await clienteAxios.post('/compra/', {productoId, usuarioId})
    return response.data;
} catch (error) {
    console.error("ERROR", error)
    throw error;
}
}

export const restarStock = async (productoId: number) => {
    try {
        const response = await clienteAxios.put('/compra/' + productoId)
        return response.data;
    } catch (error) {
        console.error("ERROR", error)
        throw error;
    }
    }
    