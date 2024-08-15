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

  if (productos.length === 0) {
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
  
    try {
      const productoCantidadMap = productos.reduce((cantidad, producto) => {
        if (producto.productoId !== undefined) {
          cantidad[producto.productoId] = (cantidad[producto.productoId] || 0) + 1;
        }
        return cantidad;
      }, {} as Record<number, number>);
  
      const verificarStockPromises = Object.entries(productoCantidadMap).map(
        async ([productoId, cantidad]) => {
          const producto = productos.find(p => p.productoId === parseInt(productoId));
          if (producto && producto.stock < cantidad) {
            throw new Error("Stock insuficiente");
          }
        }
      );
      
      await Promise.all(verificarStockPromises);
  
      const restarYRegistrarPromises = Object.entries(productoCantidadMap).map(
        async ([productoId, cantidad]) => {
          for (let i = 0; i < cantidad; i++) {
            await restarStock(parseInt(productoId));
            await registroVenta(parseInt(productoId), usuarioId);
          }
        }
      );
  
      await Promise.all(restarYRegistrarPromises);
  
      alert("¡Tu compra se ha completado con éxito!");
      localStorage.removeItem('carrodecompras');
      navegarAMain();
    } catch (error) {
      alert("Uno de los productos elegidos no está en stock. Intenta nuevamente.");
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

  const borrarProducto = (producto: Producto) => {
    const id = productos.findIndex(p => p.productoId === producto.productoId);
    if (id !== -1) {
      const productosActualizados = [...productos];
      productosActualizados.splice(id, 1);
      setProductos(productosActualizados);
      localStorage.setItem('carrodecompras', JSON.stringify(productosActualizados));
    }
  };

  return (
    <>
      <div className='carritoProducto'>
        {productos.map((producto, index) => (
          <div key={index} className='productoElegido'>
            <img className='fotoCarrito' src={producto.foto}/>
            <h1 className='textoProducto'>{producto.modelo}</h1>
            <h1 className='valorproducto'>$ {producto.precio}</h1>
            <button className='borrarEste' onClick={() => borrarProducto(producto)}>X</button>
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