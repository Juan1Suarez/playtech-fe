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
    <div>REGISTRO DE VENTAS</div>
    <button onClick={LogOut}>LOG OUT</button>
    </>
  );
}

export default withRoles(RegistroVentas, [1], '/login');