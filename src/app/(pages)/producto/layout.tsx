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


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, activarDarkMode } = UsardarkMode();
  return (
<>
<a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Logo"/></a>

<Container className='caidaproductos'>
  <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
    <Dropdown.Item as="a" href="listaProducto?tipo=Auriculares">Auriculares</Dropdown.Item>
    <Dropdown.Item as="a" href="listaProducto?tipo=Teclado">Teclados</Dropdown.Item>
    <Dropdown.Item as="a" href="listaProducto?tipo=Mouse">Mouses</Dropdown.Item>
    <Dropdown.Item as="a" href="listaProducto?tipo=Mousepad">Mousepads</Dropdown.Item>
    <Dropdown.Item as="a" href="listaProducto?tipo=Silla%20Gamer">Sillas</Dropdown.Item>
  </Dropdown>
</Container>

<div className='configUser'>
<Dropdown title={<FaUserGear size={42} />}>
    <Dropdown.Menu title="User">
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
