"use client";
import { UsardarkMode } from '@/app/services/DarkMode';
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import { useNombre } from '@/app/services/Nombre';
import { crearProducto, verProductos } from '@/app/services/Producto';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, activarDarkMode } = UsardarkMode();
  const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainAdmin");
  }

  const navegarARegistroVentas = () => {
    router.push("/registroVentas")
}
  return (
<>
<img onClick={() => navegarAMain()} className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt='Logo'/>
<div className='caidaproductos'>
<button className='irARegistro' onClick={() => navegarARegistroVentas()}>Redireccionar a registro</button>
</div>


<div className='configUser'>
  <Dropdown title={<FaUserGear size={42} />}>
    <Dropdown.Menu title="Admin">
      <Dropdown.Item >{useNombre()}</Dropdown.Item>
      <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
      <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Item onClick={activarDarkMode} className='switch' >Dark mode</Dropdown.Item>
  </Dropdown>
</div>
{children}
</>
  );
}
