import { jwtDecode } from "jwt-decode";
import clienteAxios from "./Axios";
import Login from "./model/login.model";

export const login = async (login: Login, router: any) => {
    try{
        const response = await clienteAxios.post('/login', login);
        console.log(response);
        if (response.status === 200) {
        const {rolId, accessToken, activo} = response.data;
        localStorage.setItem('accessToken', accessToken);

        if (activo === 0) {
            alert("Este usuario fue eliminado")
        } else
        if (rolId === 2 && activo === 1){
            router.push("mainUser");
        } else if (rolId === 1) {
        router.push("mainAdmin");
     }
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            alert("Email o contraseña incorrecta.");
            window.location.reload();}
    }
}

export const eliminarUsuario = async () => {
     const confirm = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?");
     if (!confirm) {
         return;
     }
    try {
        const accessToken = localStorage.getItem('accessToken')!;
        const decodedToken =  jwtDecode<{ usuarioId: number }>(accessToken);
        const usuarioId = decodedToken.usuarioId;
        const response = await clienteAxios.put('/usuarios/'+usuarioId);
          if (response.status === 200) {
            localStorage.clear();
            window.location.reload();
         }      
         return response.data; 

    } catch (error) {
        console.error("ERROR", error);
        return [];
    }
};

