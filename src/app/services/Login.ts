import clienteAxios from "./Axios";

export const verUsuarios = async () => {
    try {
        const response = await Promise.resolve(clienteAxios.get('/usuarios'));
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

