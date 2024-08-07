"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Producto from '@/app/services/model/producto.model';
import tipoDeProducto from '@/app/services/model/tipoDeProducto.model';
import { crearProducto, verProductos, verTipoDeProductos } from '@/app/services/Producto';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const VerAdminPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [buscarModelo, setBuscarModelo] = useState('');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
  const [filtrosActivos, setFiltrosActivos] = useState(false);
  const [filtroModelo, setFiltroModelo] = useState('');
  const [filtroGrupo, setFiltroGrupo] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    tipoDeProducto: '',
    modelo: '',
    precio: 0,
    color: '',
    stock: 0,
    foto: '',
    descripcion: ''
  });

  const router = useRouter();
  const navegarAProducto = (modelo: string, editar: boolean) => {
    router.push(`/productoAdmin?modelo=${modelo}&edit=${editar}`);
  }

  const [productos, setProductos] = useState<Producto[]>([]);
  useEffect(() => {
    verProductos().then((data: Producto[]) => {
      setProductos(data);
    })
  }, [])

  const [grupo, setGrupo] = useState<tipoDeProducto[]>([]);
  useEffect(() => {
    verTipoDeProductos().then((data: tipoDeProducto[]) => {
      setGrupo(data);
    })
  }, [])

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

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!nuevoProducto.tipoDeProducto || !nuevoProducto.modelo || !nuevoProducto.precio || !nuevoProducto.color || !nuevoProducto.stock || !nuevoProducto.descripcion) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      if (nuevoProducto.modelo.length > 20) {
        alert('El modelo no puede exceder los 20 caracteres.');
        return;
      }
      if (nuevoProducto.precio > 99999999999) {
        alert('El precio no puede exceder los 11 caracteres.');
        return;
      }
      if (nuevoProducto.color.length > 20) {
        alert('El color no puede exceder los 20 caracteres.');
        return;
      }
      if (nuevoProducto.stock > 500) {
        alert('El stock no puede ser más de 500.');
        return;
      }
      if (nuevoProducto.descripcion.length > 500) {
        alert('La descripción no puede exceder los 500 caracteres.');
        return;
      }
      await crearProducto(nuevoProducto, router);
      verProductos();
      handleClosePopup();
    } catch (error) {
      console.error('Error al modificar producto', error);
    }
  };

  const handleBuscarClick = () => {
    setFiltroModelo(buscarModelo);
    setFiltroGrupo(grupoSeleccionado);
    setFiltrosActivos(true);
  };

  const productosFiltrados = filtrosActivos ? productos.filter(producto =>
    producto.modelo.toLowerCase().includes(filtroModelo.toLowerCase()) &&
    (!filtroGrupo || producto.tipoDeProducto === filtroGrupo)
  ) : productos;

  return (
    <>
      <div className='filtrarProducto'>
        <div className='filtrarInput'>
          <label className='filtrarLabel'>Buscar por modelo</label>
          <input
            placeholder='Buscar por modelo'
            value={buscarModelo}
            onChange={(e) => setBuscarModelo(e.target.value)}
          />
          <br />
          <label className='filtrarLabel'>Tipo de producto</label>
          <select value={grupoSeleccionado} onChange={(e) => setGrupoSeleccionado(e.target.value)}>
            <option value="">Filtrar por tipo producto</option>
            {grupo.map(grupo => (
              <option key={grupo.tipoDeProductoId} value={grupo.grupo}>{grupo.grupo}</option>
            ))}
          </select>
        </div>
        <button className='filtrarButton' onClick={handleBuscarClick}>Buscar</button>
      </div>
      <button className='crearProducto' onClick={handleEditClick}>Añadir producto</button>
      <button className='adminPrecio' onClick={sortProducto}>Precio {sortOrder === 'asc' ? '↓' : '↑'}</button>

      {productosFiltrados.length === 0 && filtrosActivos && (
        <div className='noProductos'>No hay productos disponibles</div>
      )}

      {productosFiltrados.map(producto => (
        <div className='keyAdmin' key={producto.productoId}>
          <div className='englobadorPAdmin'>
            <img className='fotoAdmin' src={producto.foto} />
            <h3 className='modeloPAdmin'>{producto.modelo}</h3>
            <h3 className='precioPAdmin'>${producto.precio} </h3>
            <button className='verPAdmin' onClick={() => navegarAProducto(producto.modelo, false)}>Ver Producto</button>
            <button className='verPAdmin' onClick={() => navegarAProducto(producto.modelo, true)}>Editar producto</button>
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <div> Tipo de producto</div>
            <select name="tipoDeProducto" onChange={handleChange} defaultValue="">
              <option value="" disabled>Seleccionar tipo de producto</option>
              {grupo.map(grupo => (
                <option key={grupo.tipoDeProductoId} value={grupo.grupo}>{grupo.grupo}</option>
              ))}
            </select>
            <div> Modelo</div>
            <input type="text" name="modelo" placeholder='Modelo' onChange={handleChange} />
            <div> Precio</div>
            <input type="number" name="precio" placeholder='Precio' onChange={handleChange} />
            <div> Color</div>
            <input type="text" name="color" placeholder='Color' onChange={handleChange} />
            <div> Stock</div>
            <input type="number" name="stock" placeholder='Stock' onChange={handleChange} />
            <div> Foto</div>
            <small>Para cambiar foto vaya a editar producto.</small>
            <div> Descripción</div>
            <textarea name="descripcion" placeholder='Descripción' style={{ fontFamily: 'inherit', width: '300px', height: '100px' }} onChange={handleChange} />
            <button onClick={handleSubmit}> Realizar cambios</button>
            <button onClick={handleClosePopup}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default withRoles(VerAdminPage, [1], '/login');
