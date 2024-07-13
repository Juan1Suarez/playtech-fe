"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import Producto from '../../services/model/producto.model';
import { registroVenta } from '@/app/services/Registro';
import { FaUserGear } from 'react-icons/fa6';
import { jwtDecode } from 'jwt-decode';

const CarritoDeCompras = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

useEffect(() => {
    const storedProductos = localStorage.getItem('carrodecompras');
    if (storedProductos) {
      const productosRecuperados: Producto[] = JSON.parse(storedProductos);
      setProductos(productosRecuperados);
    }
  }, []); 

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  }
  
  const finalizarCompra = () => {
    const token = localStorage.getItem('accessToken')!;
    const decodedToken: { usuarioId: number } = jwtDecode(token);
    const usuarioId = decodedToken.usuarioId;
    productos.forEach(producto => {
      const productoId = producto.productoId; 
      if (productoId !== undefined) {
        console.log(`Registrando venta: Producto ID: ${productoId}, Usuario ID: ${usuarioId}`);
        registroVenta(productoId, usuarioId); 
      } else {
        console.error("El productoId es undefined para uno de los productos.");
      }
    });
  }

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

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
  <Dropdown title= <FaUserGear size={42} /> >
<Dropdown.Menu title="User">
<Dropdown.Item >Juan</Dropdown.Item>
<Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
</Dropdown.Menu>     
      <Dropdown.Item onClick={toggleDarkMode}  className='switch' >Dark mode</Dropdown.Item> 
  </Dropdown>
</div>

      <div className='carritoProducto'>
        {productos.map((producto, index) => (
          <div key={index} className='productoElegido'>
            <img className='fotonisuta' src={producto.foto}/>
            <h1 className='textoProducto'>{producto.modelo}</h1>
            <h1 className='valorproducto'>$ {producto.precio}</h1>
          </div>
        ))}
        <div className='divisor'></div>
      </div>
      
      <div className='comprarProducto'>
        {productos.length > 0 && (
          <div className='contenidoCompra'>
            <div className='nombreEnLista'>
              {productos.map((producto, index) => (
                <div className='nombreProducto' key={index}>{producto.modelo}</div>
              ))}
            </div>
            <div className='divisor1' />
            <h1 className='precioTotal'>Precio total = ${productos.reduce((total, producto) => total + producto.precio, 0)}</h1>
            <div className='fin' onClick={finalizarCompra}>Finalizar transacción</div>
          </div>
        )}
      </div>
    </>
  );
}

export default withRoles(CarritoDeCompras, [2], '/login');