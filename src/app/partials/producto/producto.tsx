"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import Producto from '../../services/model/producto.model';
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { verProductos } from '@/app/services/Producto';
import { FaUserGear } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";

const ProductoPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeloParam = searchParams.get('modelo');

  const [darkMode, setDarkMode] = useState(false);
  const [producto, setProducto] = useState<Producto | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  const navegarACarrito = () => {
    router.push("/carritoDeCompras");
  };

  const agregarCarrito = () => {
    let carritoActual = JSON.parse(localStorage.getItem('carrodecompras') || '[]');
    if (producto) {
      if (carritoActual.length >= 9) {
        alert("No puedes agregar más de 9 productos al carrito.");
        return;
      }
      carritoActual.push(producto);
    }
    localStorage.setItem('carrodecompras', JSON.stringify(carritoActual));
  };
  
  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (modeloParam) {
      verProductos().then((data: Producto[]) => {
        const productoEncontrado = data.find(prod => prod.modelo === modeloParam);
        setProducto(productoEncontrado || null);
      }).catch(error => {
        console.error('Error fetching products:', error);
      });
    }
  }, [modeloParam]);

  if (!producto) {
    return (
      <>
      <a href='mainUser'>
        <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
      </a>

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

    <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42}/></button>
    <p className='error'>Producto no encontrado</p>
    <br></br><br></br><br></br><br></br>
      </>
    )
  }

  return (
    <>
      <a href='mainUser'>
        <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
      </a>

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

    <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42}/></button>

<div className='productoCompleto'>
  <img src={producto.foto} className='fotoP'></img>
 <div className='containerDatos'>
 <div className='nombreProducto'>{producto.modelo}</div>
<h1 className='linea'></h1>
 <div className='precioProducto'>Precio: {producto.precio}</div>
 
 <h1 className='linea'></h1>
 
 <div className="dropbtn">Color: {producto.color}</div>

      <h1 className='linea'></h1>

 <button className='botonAhora' onClick={() => { navegarACarrito(); agregarCarrito(); }}>
            Comprar ahora
          </button>
          <button className='botonAgregar' onClick={agregarCarrito}>
            Agregar al carrito
          </button>
 
 </div>


</div>
     
      <div className='productosDesc'>
        <h1 className='desc'>Descripción del producto</h1>
        <h2 className='productoNombre'>Modelo : {producto.modelo}</h2>
        <p className='productoTexto'>{producto.descripcion}</p>
        <p className='productoTexto'>STOCK: {producto.stock}</p>
        <p className='productoTexto'>PRECIO: {producto.precio}</p>
      </div>
    </>
  );
};

export default withRoles(ProductoPage, [2], '/login');