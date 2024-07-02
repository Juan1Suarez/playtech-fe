"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import { verProductos } from '@/app/services/Producto';
import Producto from '../model/producto.model';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const ListaProducto = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tipoProducto, setTipoProducto] = useState<string>('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo');

  useEffect(() => {
    verProductos().then((data: Producto[]) => {
      setProductos(data);
    });

    if (tipoParam) {
      setTipoProducto(tipoParam);
    }
  }, [tipoParam]);

  const router = useRouter();
  const navegarAProducto = (producto: Producto) => {
    sessionStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    router.push("/producto");
  };

  const botonProducto = (tipo: string) => {
    router.push(`/listaProducto?tipo=${tipo.replace(/ /g, '%20')}`);
  };

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Logo"></img></a>

      <Container className='caidaproductos'>
        <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
          <Dropdown.Item><a href="/listaProducto?tipo=Auriculares">Auriculares</a></Dropdown.Item>
          <Dropdown.Item><a href="/listaProducto?tipo=Teclados">Teclados</a></Dropdown.Item>
          <Dropdown.Item><a href="/listaProducto?tipo=Mouses">Mouses</a></Dropdown.Item>
          <Dropdown.Item><a href="/listaProducto?tipo=Mousepads">Mousepads</a></Dropdown.Item>
          <Dropdown.Item><a href="/listaProducto?tipo=Sillas">Sillas</a></Dropdown.Item>
        </Dropdown>
      </Container>
      <div className='adminuser'>User</div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>

      <div className='containerProductos'>
        <button className='productosListado' onClick={() => botonProducto('Auriculares')}>Auriculares</button>
        <button className='productosListado' onClick={() => botonProducto('Teclado')}>Teclado</button>
        <button className='productosListado' onClick={() => botonProducto('Mousepad')}>Mousepad</button>
        <button className='productosListado' onClick={() => botonProducto('Silla Gamer')}>Silla gamer</button>
        <button className='productosListado' onClick={() => botonProducto('Gabinetes')}>Gabinete</button>
      </div>

      <div className='buscadorProductos'>
        {productos
          .filter(producto => producto.tipoDeProducto === tipoProducto)
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
              <img src={producto.foto} className="imgListado" alt={producto.modelo}></img>
              <div className='detalles'>
                <h1 className='prod'>{producto.modelo}</h1>
                <h1 className='preci'>{producto.precio} $</h1>
                <h3 className='co'>Color: {producto.color}</h3>
                <h3 className='sto'>STOCK: {producto.stock}</h3>
                <button className='verP' onClick={() => navegarAProducto(producto)}>Ver Producto</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default withRoles(ListaProducto, [2], '/');