"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Compra from '@/app/services/model/compra.model';
import { verCompra } from '@/app/services/Registro';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { Container, Dropdown } from 'rsuite';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'rsuite/Dropdown/styles/index.css';
import { LogOut } from '@/app/services/LogOut';
import { UsardarkMode } from '@/app/services/DarkMode';
import { useNombre } from '@/app/services/Nombre';

const RegistroVentas = () => {
  const { darkMode, activarDarkMode } = UsardarkMode();
  const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainAdmin");
  }

  const [registro, setRegistro] = useState<Compra[]>([]);
  useEffect(() => {
    verCompra().then((data: Compra[]) => {
      console.log(data)
      setRegistro(data);
    })
  }, [])

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

  const generarPDF = () => {
    const doc = new jsPDF() as jsPDF & { autoTable: typeof autoTable };
    autoTable(doc, {
      head: [['ID COMPRA', 'ID CLIENTE', 'CLIENTE', 'EMAIL', 'FECHA', 'ID PRODUCTO', 'MODELO', 'PRECIO']],
      body: currentItems.map(compra => [
        compra.compraId,
        compra.usuarioId,
        compra.nombre,
        compra.email,
        (new Date(compra.fecha)).toLocaleString(),
        compra.productoId,
        compra.modelo,
        compra.precio
      ]),
    });
    doc.save('registro_ventas.pdf');
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
            <Dropdown.Item >{useNombre()}</Dropdown.Item>
            <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
          <Dropdown.Item onClick={activarDarkMode} className='switch' >Dark mode</Dropdown.Item>
        </Dropdown>
      </div>

      <div className='paginado'>
        {Array.from({ length: Math.ceil(registro.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>

      <button onClick={generarPDF} className="exportar">
        Exportar a PDF
      </button>

      <button className='precioRegistro' onClick={sortRegistro}>
        Precio {sortOrder === 'asc' ? '↓' : '↑'}
      </button>
      <table className='registroV'>
        <thead>
          <tr>
            <th>ID COMPRA</th>
            <th>ID CLIENTE</th>
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
              <td>{(new Date(compra.fecha)).toLocaleString()}</td> 
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