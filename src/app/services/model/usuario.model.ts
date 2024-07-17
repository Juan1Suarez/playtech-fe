interface Usuario {
    usuarioId?: number;
    nombre: string;
    email: string;
    password: string;
    activo?:number;
    codigo?:string;
}
export default Usuario;