import clienteAxios from "./Axios";
import Usuario from "../partials/model/usuario.model";

export const verUsuarios = async () => {
    try {
        const response = await Promise.resolve(clienteAxios.get('/usuarios'));
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const crearUsuarios = async (Usuario: Usuario, router: any) => {
    try{
        const response = await clienteAxios.post('/usuarios', Usuario);
        console.log(response);
        router.push("mainUser")
    } catch (error) {
        console.log (error)
    }
}
