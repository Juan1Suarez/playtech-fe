import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const usarNombre= () => {
const [nombre, setNombre] = useState('');
useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      try {
        const decodedToken: { nombre: string } = jwtDecode(token);
        setNombre(decodedToken.nombre);
      } catch (error) {
        console.log("No hay un usuario")
      }
    }
  }, []);
  return nombre;
};