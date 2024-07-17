"use client";
import { UsardarkMode } from '@/app/services/DarkMode';
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import Producto from '@/app/services/model/producto.model';
import { usarNombre } from '@/app/services/Nombre';
import { verProductos } from '@/app/services/Producto';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';


const verAdminPage = () => {
  const { darkMode, activarDarkMode } = UsardarkMode();
    const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainAdmin");
  }

  const navegarARegistroVentas = () => {
    router.push("/registroVentas")
}

  const navegarAProducto = (modelo: string) => {
    router.push("/productoAdmin?modelo=" + modelo);
}

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
<Dropdown onClick={() => navegarARegistroVentas()} title="Redireccionar al registro de ventas" size="lg" >
  </Dropdown>
</Container>


<div className='configUser'>
  <Dropdown title={<FaUserGear size={42} />}>
    <Dropdown.Menu title="Admin">
      <Dropdown.Item >{usarNombre()}</Dropdown.Item>
      <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
      <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Item onClick={activarDarkMode} className='switch' >Dark mode</Dropdown.Item>
  </Dropdown>
</div>

<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

<div className='buscadorProductos'>
        {productos
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
              <img src={producto.foto} className="imgListado"></img>
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