"use client";
import React, { useEffect, useState } from 'react';
import { withRoles } from '@/app/services/HOC/withRoles';
import 'rsuite/Dropdown/styles/index.css';
import { verProductos, verTipoDeProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { TiShoppingCart } from "react-icons/ti";
import tipoDeProducto from '@/app/services/model/tipoDeProducto.model';


const ListaProducto = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tipoProducto, setTipoProducto] = useState<string>('');
  const [grupo, setGrupo] = useState<tipoDeProducto[]>([]);
    
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo');

  useEffect(() => {
    verTipoDeProductos().then((data:tipoDeProducto[]) =>{
      setGrupo(data);
    })
  }, [])

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
      <div className='containerLista'>
      <div className='containerProductos'>
        {grupo
        .map(grupo =>(
          <button key={grupo.tipoDeProductoId} className='productosListado' onClick={() => botonProducto(grupo.grupo)}>{grupo.grupo}</button>
        )
        )}
        </div>  

      <div className='buscadorProductos'>
      {productos.filter(producto => producto.tipoDeProducto === tipoProducto).length === 0 ? (
            <p className='errorL'>No hay productos disponibles para el tipo seleccionado.</p>
          ) : (
        productos
          .filter(producto => producto.tipoDeProducto === tipoProducto)
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
              <img src={producto.foto} className="imgListado"/>
              <div className='detalles'>
                <h1 className='prod'>{producto.modelo}</h1>
                <h1 className='linea'></h1>
                <h2 className='preci'>${producto.precio} </h2>
                <h1 className='lineaColor'></h1>
                <h3 className='co'>Color: {producto.color}</h3>
                <button className='verP' onClick={() => navegarAProducto(producto.modelo)}>Ver Producto</button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </>
  );
}

export default withRoles(ListaProducto, [2], '/login');