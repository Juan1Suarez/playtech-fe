"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';;
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import { verProductos } from '@/app/services/Producto';
import Producto from '../model/producto.model';
import { useRouter } from 'next/navigation';

const ListaProducto = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  useEffect(() => {
    verProductos().then((data: Producto[]) => {
      setProductos(data);
    })
  })

  const router = useRouter();
  const navegarAProducto = (producto: Producto) => {
    sessionStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    router.push("/producto");
}

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

      <Container className='caidaproductos'>
        <Dropdown title="¿Que tipo de producto estas buscando?" size="lg" >
          <Dropdown.Item><a href="listaProducto">Auriculares</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Teclados</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Mouses</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Mousepads</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Sillas</a></Dropdown.Item>
        </Dropdown>
      </Container>
      <div className='adminuser'>User</div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>

      <div className='containerProductos'>
        <p className='productosListado'> -Auriculares</p>
        <p className='productosListado'> -Mousepad</p>
        <p className='productosListado'> -Monitores</p>
        <p className='productosListado'> -Teclados</p>
        <p className='productosListado'> -Sillas gamer</p>
        <p className='productosListado'> -Mouses</p>
        <p className='productosListado'> -Gabinetes</p>
        <p className='productosListado'> -Gabinetes</p>
        <p className='productosListado'> -Gabinetes</p>
        <p className='productosListado'> -Gabinetes</p>
      </div>

      <div className='buscadorProductos'>
        {productos
          .filter(producto => producto.tipoDeProducto === "Teclado")
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
                <img src={producto.foto}  className="imgListado"></img>
                <div className='detalles'>
                  <h1 className='prod'>{producto.modelo}</h1>
                  <h1 className='preci'>{producto.precio} $</h1>
                  <h3 className='co'>Color: {producto.color}</h3>
                  <h3 className='sto'>STOCK: {producto.stock}</h3>
                  <button className='verP'  onClick={() => navegarAProducto(producto)}>Ver Producto</button>
                </div>
            </div>
          ))}
      </div>
    </>

  );
}

export default withRoles(ListaProducto, [2], '/');