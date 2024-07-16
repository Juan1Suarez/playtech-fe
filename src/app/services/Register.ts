import { jwtDecode } from "jwt-decode";
import clienteAxios from "./Axios";
import Usuario from "./model/usuario.model";

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

        if (response.status === 201 ) {
            const {accessToken} = response.data
            localStorage.setItem('accessToken', accessToken)
            alert("¡Usuario creado exitosamente! Por favor inicie sesión");
            router.push("/login")
        }
    } catch (error: any) {
         if (error.response.status === 500) {
            alert ("Ya existe un usuario con este mail")
        }
    }
}

