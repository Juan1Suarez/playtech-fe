"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import { table } from 'console';
import React, { useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import {  Dropdown } from 'rsuite';





const RegistroVentas = () => {
  const [darkMode, setDarkMode] = useState(false);
const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  document.body.classList.toggle("darkMode", !darkMode);
};
  
const LogOut = () => {
  localStorage.clear();
  window.location.reload();
}
  
  return (
    <>     

<img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
<div className='configUser'>
  <Dropdown title= <FaUserGear size={42} /> >
<Dropdown.Menu title="Admin">
<Dropdown.Item >Juan</Dropdown.Item>
<Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
</Dropdown.Menu>     
      <Dropdown.Item onClick={toggleDarkMode}  className='switch' >Dark mode</Dropdown.Item> 
  </Dropdown>
</div>


<table className='registroV'>
  <tr>
    <th>ID CL</th>
    <th>CLIENTE</th>
    <th>FECHA</th>
    <th>HORA</th>
    <th>ID PRODUCTO</th>
    <th>MODELO</th>
    <th>PRECIO</th>
    <th>CANTIDAD</th>
    <th>TOTAL</th>
  </tr>
  <tr>
    <td>12</td>
    <td>EDWIN EUSTAQUIO</td>
    <td>2024/12/12</td>
    <td>12:34</td>
    <td>27</td>
    <td>NISUTA NSAUG 305</td>
    <td>129.000</td>
    <td>1</td>
    <td>129.000</td>
  </tr>
</table>
    </>
  );
}

export default withRoles(RegistroVentas, [1], '/login');