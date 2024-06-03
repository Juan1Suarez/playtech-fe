interface Usuario {
    nombre: string;
    email: string;
    password: string;
    activo?:number;
    codigo?:string;
}
export default Usuario;