"use client";
import { UsardarkMode } from '@/app/services/DarkMode';
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import tipoDeProducto from '@/app/services/model/tipoDeProducto.model';
import { useNombre } from '@/app/services/Nombre';
import { crearProducto, verProductos, verTipoDeProductos } from '@/app/services/Producto';
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
  const router = useRouter();
  const { darkMode, activarDarkMode } = UsardarkMode();
  const [grupo, setGrupo] = useState<tipoDeProducto[]>([]);
  useEffect(() => {
    verTipoDeProductos().then((data:tipoDeProducto[]) =>{
      setGrupo(data);
    })
  }, [])
  const botonProducto = (tipo: string) => {
    router.push(`/listaProducto?tipo=${tipo.replace(/ /g, '%20')}`);
  };
  return (
<>
<a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Logo"/></a>

<Container className='caidaproductos'>
<Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
        {grupo
        .map(grupo =>(
          <Dropdown.Item as="a" onClick={() => botonProducto(grupo.grupo)}>{grupo.grupo}</Dropdown.Item>
        )
        )}
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
