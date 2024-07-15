"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarUsuario } from '@/app/services/Login';
import Compra from '@/app/services/model/compra.model';
import { verCompra } from '@/app/services/Registro';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { Container, Dropdown } from 'rsuite';

const RegistroVentas = () => {

  const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainAdmin");
  }

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.body.classList.toggle("darkMode", storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newDarkMode = !prev;
      document.body.classList.toggle("darkMode", newDarkMode);
      localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
      return newDarkMode;
    });
  };

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const [registro, setRegistro] = useState<Compra[]>([]);
  useEffect(() => {
    verCompra().then((data: Compra[]) => {
      setRegistro(data);
    })
  }, [])

  const [nombre, setNombre] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decodedToken: { nombre: string } = jwtDecode(token);
        setNombre(decodedToken.nombre);
      } catch (error) {
        console.log("No hay un usuario")
      }
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registro.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [sortOrder, setSortOrder] = useState('asc');

  const sortRegistro = () => {
    const sortedRegistro = [...registro].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    setRegistro(sortedRegistro);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  return (
    <>
      <img onClick={() => navegarAMain()} className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

      <Container className='caidaproductos'>
        <Dropdown title="Redireccionar al registro de ventas" size="lg" >
        </Dropdown>
      </Container>


      <div className='configUser'>
        <Dropdown title={<FaUserGear size={42} />}>
          <Dropdown.Menu title="Admin">
            <Dropdown.Item >{nombre}</Dropdown.Item>
            <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
            <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
          </Dropdown.Menu>
          <Dropdown.Item onClick={toggleDarkMode} className='switch' >Dark mode</Dropdown.Item>
        </Dropdown>
      </div>

      <div className='paginado'>
        {Array.from({ length: Math.ceil(registro.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>

      <button className='precioRegistro' onClick={sortRegistro}>
        Precio {sortOrder === 'asc' ? '↓' : '↑'}
      </button>
      <table className='registroV'>
        <thead>
          <tr>
            <th>ID COMPRA</th>
            <th>ID CL</th>
            <th>CLIENTE</th>
            <th>EMAIL</th>
            <th>FECHA</th>
            <th>ID PRODUCTO</th>
            <th>MODELO</th>
            <th>PRECIO</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((compra, index) => (
            <tr key={index}>
              <td>{compra.compraId}</td>
              <td>{compra.usuarioId}</td>
              <td>{compra.nombre}</td>
              <td>{compra.email}</td>
              <td>{compra.fecha}</td>
              <td>{compra.productoId}</td>
              <td>{compra.modelo}</td>
              <td>{compra.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  );
}

export default withRoles(RegistroVentas, [1], '/login');