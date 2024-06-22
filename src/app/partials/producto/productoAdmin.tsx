"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';;
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Producto from '../model/producto.model';
import { withRoles } from '@/app/services/HOC/withRoles';


const ProductoAdminPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const storedProducto = sessionStorage.getItem('productoSeleccionado');
    if (storedProducto) {
      const productoRecuperado: Producto = JSON.parse(storedProducto);
      setProducto(productoRecuperado);
    }
  }, []);

  if (!producto) {
    return <div>ERROR PAGINA NO ENCONTRADA</div>;
  }


  return (
    <>
      <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

      <input className='navigation' placeholder='Buscar Producto'></input>
      <button className='buscar'><FaMagnifyingGlass /></button>
      <div className='adminuser'></div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>
      <div className='nombreproducto'>{producto.modelo}</div>
      <div className='precioproducto'>Precio: {producto.precio}</div>
      <div className="dropdown">
        <button className="dropbtn">Color:</button>
        <div className="dropdown-content">
          <a href="#">{producto.color}</a>
        </div>
      </div>

      <div className='productos'>
        <img src={producto.foto} className='fotoP'></img>
        <div className='productosComprar'>
          <button className='botoneliminar'>
            Eliminar producto
          </button>
          <button className='botonagregar'>
            Editar producto
          </button>
        <h1 className='envio'>Seleccione el t͟i͟p͟o͟ d͟e͟ e͟n͟v͟i͟o͟</h1>
        
        </div>
      </div>

      <div className='productosDesc'>
        <h1 className='desc'>Descripción del producto</h1>
        <h2 className='productoNombre'>Modelo : {producto.modelo}</h2>
        <p className='productoTexto'>{producto.descripcion}</p>
        <p className='productoTexto'>STOCK: {producto.stock}</p>
        <p className='productoTexto'>PRECIO: {producto.precio}</p>
        <p className='productoTexto'>ID: {producto.productoId}</p>
      </div>
    </>
  );
}

export default withRoles(ProductoAdminPage, [1], '/');