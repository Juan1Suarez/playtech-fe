"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import React from 'react';


const LogOut = () => {
  localStorage.clear();
  window.location.reload();
}


const RegistroVentas = () => {
  return (
    <>     
<button onClick={LogOut}>LOG OUT</button>
<table className='registroV'>
  <tr>
    <th>ID</th>
    <th>CLIENTE</th>
    <th>FECHA</th>
    <th>HORA</th>
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