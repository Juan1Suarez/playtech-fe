"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarUsuario } from '@/app/services/Login';
import Producto from '@/app/services/model/producto.model';
import { verProductos } from '@/app/services/Producto';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { Container, Dropdown } from 'rsuite';


const verAdminPage = () => {
    const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainAdmin");
  }

  const navegarAProducto = (modelo: string) => {
    router.push("/productoAdmin?modelo=" + modelo);
}

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.body.classList.toggle("darkMode", storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newDarkMode = !prev;
      document.body.classList.toggle("darkMode", newDarkMode);
      localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
      return newDarkMode;
    });
  };

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

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

  const [productos, setProductos] = useState<Producto[]>([]);
  useEffect(() => {
    verProductos().then((data: Producto[]) => {
        setProductos(data);
    })
})
  return (
    <>
<img onClick={() => navegarAMain()} className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

<Container className='caidaproductos'>
  <Dropdown title="Redireccionar al registro de ventas" size="lg" >
  </Dropdown>
</Container>


<div className='configUser'>
  <Dropdown title={<FaUserGear size={42} />}>
    <Dropdown.Menu title="Admin">
      <Dropdown.Item >{nombre}</Dropdown.Item>
      <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
      <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Item onClick={toggleDarkMode} className='switch' >Dark mode</Dropdown.Item>
  </Dropdown>
</div>

<div className='buscadorProductos'>
        {productos
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
              <img src={producto.foto} className="imgListado" alt={producto.modelo}></img>
              <div className='detalles'>
                <h1 className='prod'>{producto.modelo}</h1>
                <h1 className='linea'></h1>
                <h2 className='preci'>${producto.precio} </h2>
                <h1 className='lineaColor'></h1>
                <h3 className='co'>Color: {producto.color}</h3>
                <button className='verP' onClick={() => navegarAProducto(producto.modelo)}>Ver Producto</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default withRoles(verAdminPage, [1], '/login');