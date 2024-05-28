import clienteAxios from "./Axios";
import Login from "../partials/model/login.model";

export const login = async (login: Login, router: any) => {
    try{
        const response = await clienteAxios.post('/login', login);
        console.log(response);
        if (response.status === 200 && login.codigo =="USER") {
            router.push("/mainUser");
        } else if (response.status === 200 && login.codigo == "ADMIN") {
            router.push("/mainAdmin");
        }
    } catch (error) {
        console.log (error)
    }
}



