interface Producto {
    productoId: number;
    tipoDeProducto: string;
    modelo: string;
    precio:number;
    color:string;
    descripcion: string;
    foto: string;
    stock: string;
    fotoDelete?: string;
    fotoDisplay?: string;
}
export default Producto;