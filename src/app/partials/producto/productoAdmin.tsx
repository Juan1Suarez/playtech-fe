"use client";
import React, { useEffect, useState } from 'react';
import Producto from '../../services/model/producto.model';
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarProducto, modificarProducto, upload, verProductos } from '@/app/services/Producto';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import { FaUserGear } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import { UsardarkMode } from '@/app/services/DarkMode';
import { useNombre } from '@/app/services/Nombre';

const ProductoAdminPage = () => {
  const nombre = useNombre();
  const { darkMode, activarDarkMode } = UsardarkMode();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeloParam = searchParams.get('modelo');


  const navegarARegistroVentas = () => {
    router.push("/registroVentas")
  }

  const [producto, setProducto] = useState<Producto | null>(null);

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
        <p className='error'>Producto no encontrado</p>
      </>
    )
  }

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  let file: Blob[] = []
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    file = Array.from(e.target.files ?? [])
    console.log("files:", file)
  }

  const handleSubmit = async () => {
    try {
      if (!producto.tipoDeProducto || !producto.modelo || !producto.precio || !producto.color || !producto.stock || !producto.descripcion) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      if (producto.modelo.length > 20) {
        alert('El modelo no puede exceder los 20 caracteres.');
        return;
      }
      if (producto.precio > 99999999999) {
        alert('El precio no puede exceder los 11 caracteres.');
        return;
      }
      if (producto.color.length > 20) {
        alert('El color no puede exceder los 20 caracteres.');
        return;
      }
      if (producto.stock > 500) {
        alert('El stock no puede ser más 500.');
        return;
      }
      if (producto.descripcion.length > 500) {
        alert('La descripción no puede exceder los 500 caracteres.');
        return;
      }
      if (file[0]){
      const form = new FormData()
      form.set('file', file[0])
      form.set('productoId', producto.productoId?.toString()??'')
      await upload(form)      
    }
      await modificarProducto(producto.productoId, producto, router);
      handleClosePopup();
    } catch (error) {
      console.error('Error al modificar producto', error);
    }
  };
  return (
    <>
      <div className='productoCompleto'>
        <img src={producto.foto} className='fotoP'/>
        <div className='containerDatos'>
             <div> Tipo de producto</div>
                <select name="tipoDeProducto" onChange={handleChange} defaultValue={producto.tipoDeProducto} disabled>
                  <option value="Auriculares">Auriculares</option>
                  <option value="Teclado">Teclado</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Mousepad">Mousepad</option>
                  <option value="Silla Gamer">Silla Gamer</option>
                </select>
                <div> Modelo</div>
                <input type="text" name="modelo" value={producto.modelo} onChange={handleChange} readOnly />
                <div> Precio</div>
                <input type="number" name="precio" value={producto.precio} onChange={handleChange} readOnly />
                <div> Color</div>
                <input type="text" name="color" value={producto.color} onChange={handleChange} readOnly />
                <div> Stock</div>
                <input type="number" name="stock" value={producto.stock} onChange={handleChange} readOnly />
                <div> Foto</div>
                <input
                  type="file"
                  name="foto"
                  onChange={handleFileSelected} />
                <div> Descripción</div>
                <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} style={{ fontFamily: 'inherit', width: '300px', height: '100px',maxHeight: '190px' }}  readOnly/>  
<br></br>
          <button
            className='botonEliminar'
            onClick={() => {
              if (window.confirm('¿Está seguro de que quiere eliminar este producto?')) {
                eliminarProducto(producto.productoId, router);
              }
            }}
          > Eliminar producto
          </button>
          <button onClick={handleSubmit} style={{margin:10}}> Realizar cambios</button>
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
}

export default withRoles(ProductoAdminPage, [1], '/login');