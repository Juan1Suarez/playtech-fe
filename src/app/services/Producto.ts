import clienteAxios from "./Axios";
import Producto from "./model/producto.model";

export const verProductos = async (): Promise<Producto[]> => {
    try {
        const response = await clienteAxios.get('/producto');
        return response.data;
    } catch (error) {
        console.error("ERROR", error);
        return [];
    }
};

export const eliminarProducto = async (productoId: any, router: any) => {
    try {
        const response = await clienteAxios.delete('/producto/'+productoId);
          if (response.status === 200) {
            router.push("mainAdmin");
         }      
         return response.data; 

    } catch (error) {
        console.error("ERROR", error);
        return [];
    }
};

export const modificarProducto = async (productoId: any, producto: Producto, router: any) => {
    try {
      const response = await clienteAxios.put(`/producto/${productoId}`, producto);
      
      if (response.status === 200) {
        router.push("/mainAdmin");
      }
      return response.data;

    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  };

  
export const crearProducto = async (producto: Producto, router: any) => {
  try {
    const response = await clienteAxios.post(`/producto/`, producto);
    
    if (response.status === 201) {
      router.push("/mainAdmin");
    }
    return response.data;

  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};


export const upload = async( file: any, productoId: any) => {
  try {
  const response = await clienteAxios.post('imagen/upload', { file, productoId })
  return response.data;
} catch (error) {
    console.error("ERROR", error);
    return [];
}
};  