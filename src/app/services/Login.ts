import clienteAxios from "./Axios";
import Login from "../partials/model/login.model";

export const login = async (Login: Login, router: any) => {
    try{
        const response = await clienteAxios.post('/login', Login);
        console.log(response);
        if (response.status === 200) {
            router.push("/main");
        }
    } catch (error) {
        console.log (error)
    }
}



