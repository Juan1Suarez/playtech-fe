"use client";
import React, { useEffect, useState } from 'react';
import Producto from '../../services/model/producto.model';
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarProducto, modificarProducto, upload, verProductos, verTipoDeProductos } from '@/app/services/Producto';
import { useRouter, useSearchParams } from 'next/navigation';
import tipoDeProducto from '@/app/services/model/tipoDeProducto.model';

const ProductoAdminPage = () => {
  const [editar, setEditar] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const modeloParam = searchParams.get('modelo');
  const editParam = searchParams.get('edit');
  const [grupo, setGrupo] = useState<tipoDeProducto[]>([]);
  useEffect(() => {
    verTipoDeProductos().then((data:tipoDeProducto[]) =>{
      setGrupo(data);
    })
  }, [])


  const navegarAMain = () => {
    router.push("/mainAdmin")
  }

  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (modeloParam) {
      verProductos().then((data: Producto[]) => {
        const productoEncontrado = data.find(prod => prod.modelo === modeloParam);
        setProducto(productoEncontrado || null);
        setEditar(editParam === 'true');
      }).catch(error => {
        console.error('Error', error);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    console.log("files:", selectedFile);
  };

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
      if (file) {
      const form = new FormData()
      form.set('file', file);
      form.set('productoId', producto.productoId?.toString()??'')
      await upload(form)      
    }
      await modificarProducto(producto.productoId, producto, router);
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
                <select name="tipoDeProducto" onChange={handleChange} defaultValue={producto.tipoDeProducto} disabled={!editar}>
                {grupo
                .map(grupo => (
                  <option key={grupo.tipoDeProductoId} value={grupo.grupo} >{grupo.grupo}</option>
                )
                )}
                </select>
                <div> Modelo</div>
                <input type="text" name="modelo" value={producto.modelo} onChange={handleChange} readOnly={!editar} />
                <div> Precio</div>
                <input type="number" name="precio" value={producto.precio} onChange={handleChange} readOnly={!editar} />
                <div> Color</div>
                <input type="text" name="color" value={producto.color} onChange={handleChange} readOnly={!editar} />
                <div> Stock</div>
                <input type="number" name="stock" value={producto.stock} onChange={handleChange} readOnly={!editar} />
                <div> Foto</div>
                <input
                  type="file"
                  name="foto"
                  onChange={handleFileSelected} disabled={!editar} />
                <div> Descripción</div>
                <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} style={{ fontFamily: 'inherit', width: '300px', height: '100px',maxHeight: '190px' }}  readOnly={!editar}/>  
<br></br>
{editar ? (
            <>
              <button
                className='botonEliminar'
                onClick={() => {
                  if (window.confirm('¿Está seguro de que quiere eliminar este producto?')) {
                    eliminarProducto(producto.productoId, router);
                  }
                }}
              >
                Eliminar producto
              </button>
              <button onClick={handleSubmit} style={{ margin: 10 }}>Realizar cambios</button>
            </>
          ) : (
            <button className='botonAhora' onClick={() => navegarAMain()}>Volver a productos</button>
          )}
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