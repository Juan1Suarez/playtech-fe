"use client";
import React, { useEffect, useState } from 'react';
import Producto from '../../services/model/producto.model';
import { withRoles } from '@/app/services/HOC/withRoles';
import 'rsuite/Dropdown/styles/index.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { verProductos } from '@/app/services/Producto';
import { TiShoppingCart } from "react-icons/ti";

const ProductoPage = () => {;
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeloParam = searchParams.get('modelo');
  const [producto, setProducto] = useState<Producto | null>(null);

  const navegarACarrito = () => {
    router.push("/carritoDeCompras");
  };

  const agregarCarrito = (mostrarAlerta = true) => {
    let carritoActual = JSON.parse(localStorage.getItem('carrodecompras') || '[]');
    if (producto) {
      if (carritoActual.length >= 9) {
        alert("No puedes agregar más de 9 productos al carrito.");
        return;
      }
      carritoActual.push(producto);
    }
    localStorage.setItem('carrodecompras', JSON.stringify(carritoActual));
    if (mostrarAlerta) {
      alert("Artículo añadido exitosamente.");
    }
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

  return (
    <>
      {producto && (
        <>
          <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42} /></button>
          <div className='productoCompleto'>
            <img src={producto.foto} className='fotoP'/>
            <div className='containerDatosUser'>
              <div className='nombreProducto'>{producto.modelo}</div>
              <div>Stock: {producto.stock}</div>
              <h1 className='linea'></h1>
              <div className='precioProducto'>Precio: {producto.precio}</div>

              <h1 className='linea'></h1>

              <div className="dropbtn">Color: {producto.color}</div>

              <h1 className='linea'></h1>

              <button className='botonAhora' onClick={() => { agregarCarrito(false); navegarACarrito(); }}>
                Comprar ahora
              </button>
              <button className='botonAgregar' onClick={() => agregarCarrito(true)}>
                Agregar al carrito
              </button>
            </div>
          </div><div className='productosDesc'>
            <h1 className='desc'>Descripción del producto</h1>
            <h2 className='productoNombre'>Modelo : {producto.modelo}</h2>
            <p className='productoTexto'>{producto.descripcion}</p>
            <p className='productoTexto'>STOCK: {producto.stock}</p>
            <p className='productoTexto'>PRECIO: {producto.precio}</p>
          </div> </>
      )}
      {!producto && (
        <>
          <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42} /></button>
          <p className='error'>Producto no encontrado</p>
          <br></br><br></br><br></br><br></br>
        </>
      )
      }
    </>
  );
};

export default withRoles(ProductoPage, [2], '/login');