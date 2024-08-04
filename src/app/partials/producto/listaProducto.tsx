"use client";
import React, { useEffect, useState } from 'react';
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import { verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FaUserGear } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import { UsardarkMode } from '@/app/services/DarkMode';
import { useNombre } from '@/app/services/Nombre';

const ListaProducto = () => {
  const { darkMode, activarDarkMode } = UsardarkMode();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tipoProducto, setTipoProducto] = useState<string>('');
    
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
  
  const [sortOrder, setSortOrder] = useState('asc');

  const sortProducto = () => {
    const sortedProducto = [...productos].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    setProductos(sortedProducto);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const router = useRouter();
  const navegarAProducto = (modelo: string) => {
    router.push("/producto?modelo="+ modelo);
  };

  const botonProducto = (tipo: string) => {
    router.push(`/listaProducto?tipo=${tipo.replace(/ /g, '%20')}`);
  };

  const navegarACarrito = () => {
    router.push("/carritoDeCompras");
  };

  return (
    <>
    <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42}/></button>
      
    <button className='listaPrecio' onClick={sortProducto}>Precio {sortOrder === 'asc' ? '↓' : '↑'}</button>
      <div className='containerProductos'>
        <button className='productosListado' onClick={() => botonProducto('Auriculares')}>Auriculares</button>
        <button className='productosListado' onClick={() => botonProducto('Teclado')}>Teclado</button>
        <button className='productosListado' onClick={() => botonProducto('Mousepad')}>Mousepad</button>
        <button className='productosListado' onClick={() => botonProducto('Silla Gamer')}>Silla gamer</button>
      </div>
      <div className='buscadorProductos'>
        {productos
          .filter(producto => producto.tipoDeProducto === tipoProducto)
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
              <img src={producto.foto} className="imgListado" alt={producto.modelo}/>
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

export default withRoles(ListaProducto, [2], '/login');