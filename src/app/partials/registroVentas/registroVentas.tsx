"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import { verCompra } from '@/app/services/Registro';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import {  Dropdown } from 'rsuite';

const RegistroVentas = () => {
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();
    const navegarAMain = () => {
        router.push("/mainAdmin");
    }
const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  document.body.classList.toggle("darkMode", !darkMode);
};
  
const LogOut = () => {
  localStorage.clear();
  window.location.reload();
}

const [registro, setRegistro] = useState<any[]>([]);
useEffect(() => {
  verCompra().then((data: any[]) => {
      setRegistro(data);
  })
}, [])
  
  return (
    <>     

<img className="playmain" onClick={navegarAMain} src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

<div className='configUser'>
  <Dropdown title= <FaUserGear size={42} /> >
<Dropdown.Menu title="Admin">
<Dropdown.Item >Juan</Dropdown.Item>
<Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
</Dropdown.Menu>     
      <Dropdown.Item onClick={toggleDarkMode}  className='switch' >Dark mode</Dropdown.Item> 
  </Dropdown>
</div>

<table className='registroV'>
<thead>
  <tr>
    <th>ID COMPRA</th>
    <th>ID CL</th>
    <th>CLIENTE</th>
    <th>EMAIL</th>
    <th>FECHA</th>
    <th>ID PRODUCTO</th>
    <th>MODELO</th>
    <th>PRECIO</th>
  </tr>
</thead>
<tbody>
  {registro.map((compra, index) => (
    <tr key={index}>
      <td>{compra.compraId}</td>
      <td>{compra.usuarioId}</td>
      <td>{compra.nombre}</td>
      <td>{compra.email}</td>
      <td>{compra.fecha}</td>
      <td>{compra.productoId}</td>
      <td>{compra.modelo}</td>
      <td>{compra.precio}</td>
    </tr>
  ))}
</tbody>
</table>

    </>
  );
}

export default withRoles(RegistroVentas, [1], '/login');