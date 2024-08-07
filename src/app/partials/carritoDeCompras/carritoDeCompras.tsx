"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import React, { useEffect, useState } from 'react';
import 'rsuite/Dropdown/styles/index.css';
import Producto from '../../services/model/producto.model';
import { registroVenta, restarStock } from '@/app/services/Registro';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';


const CarritoDeCompras = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainUser");
  }

  useEffect(() => {
    const storedProductos = localStorage.getItem('carrodecompras');
    if (storedProductos) {
      const productosRecuperados: Producto[] = JSON.parse(storedProductos);
      setProductos(productosRecuperados);
    }
  }, []);

  if (!localStorage.getItem('carrodecompras')) {
    return (
      <>
    <p className='error'>No hay articulos en el carrito de compra</p>
    <br></br><br></br><br></br><br></br>

      </>
    );
  }


  const finalizarCompra = async () => {
    const token = localStorage.getItem('accessToken')!;
    const decodedToken: { usuarioId: number } = jwtDecode(token);
    const usuarioId = decodedToken.usuarioId;
  
    const restarStockPromises = productos.map(producto => {
      const productoId = producto.productoId;
      if (productoId !== undefined) {
        return restarStock(productoId);
      }
      return Promise.resolve();
    });
    try {
      await Promise.all(restarStockPromises);
  
      const registroPromises = productos.map(producto => {
        const productoId = producto.productoId;
        return registroVenta(productoId, usuarioId);
      });
      
      await Promise.all(registroPromises); 
      alert("¡Tu compra se ha completado con éxito!");
      localStorage.removeItem('carrodecompras');
      navegarAMain();
    } catch (error) {
      alert("Uno de los productos elegidos no esta en stock. Intenta nuevamente.");
      console.error(error);
    }
  };

  const borrarCompra = () => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar el carrito?");
    if (!confirm) {
        return;
    }
    localStorage.removeItem('carrodecompras');
    window.location.reload();
  }

  return (
    <>
      <div className='carritoProducto'>
        {productos.map((producto, index) => (
          <div key={index} className='productoElegido'>
            <img className='fotoCarrito' src={producto.foto} alt={producto.modelo}/>
            <h1 className='textoProducto'>{producto.modelo}</h1>
            <h1 className='valorproducto'>$ {producto.precio}</h1>
          </div>
        ))}
        <div className='divisor'></div>
      </div>
      <div className='borrarCarrito' onClick={borrarCompra}>Limpiar el carrito</div>

      <div className='comprarProducto'>
        {productos.length > 0 && (
          <div>
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
      <br></br><br></br><br></br><br></br>
    </>
  );
}

export default withRoles(CarritoDeCompras, [2], '/login');