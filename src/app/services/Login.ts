import clienteAxios from "./Axios";
import Login from "../partials/model/login.model";

export const login = async (login: Login, router: any) => {
    try{
        const response = await clienteAxios.post('/login', login);
        console.log(response);
        if (response.status === 200) {
        const {rolId, accessToken} = response.data;
        sessionStorage.setItem('accessToken', accessToken);

        if (rolId === 2){
            router.push("mainUser");
        } else if (rolId === 1) {
        router.push("mainAdmin");
     }
        }
    } catch (error) {
        console.log (error)
    }
}



