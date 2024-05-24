"use client";
import React from 'react';
import Switch from '@mui/material/Switch';

export default function Home() {
    function darkMode() {
        var element = document.body;
        element.classList.toggle("darkMode");
    }
    return (
<>
<div className='fondodark'>
<div className='switch'>Dark mode</div>
<Switch  onChange={darkMode} className='switch'  form="flexSwitchCheckChecked" />
       
   </div>
    <br></br>
      <div className='fondoimg'>
   <a href="https://www.mercadolibre.com.ar/auriculares-gamer-nisuta-nsaug300-negro-y-azul/p/MLA15317091#searchVariation=MLA15317091&position=17&search_layout=stack&type=product&tracking_id=5939455b-3284-499b-9db3-18a0989a6883"  > <img className='imgg' src="./img/nisuta.webp"  /> 
    Auriculares gamer Nisuta NSAUG300   
    <h1>$120.000</h1>
    </a>
   
  <a href="https://www.mercadolibre.com.ar/auriculares-gamer-nisuta-nsaug300-negro-y-azul/p/MLA15317091#searchVariation=MLA15317091&position=17&search_layout=stack&type=product&tracking_id=5939455b-3284-499b-9db3-18a0989a6883"  > <img className='imgg' src="./img/nisuta.webp"  /> 
    Auriculares gamer Nisuta NSAUG300  
     <h1>$120.000</h1>
     </a>
   
   
  </div>



        </>
        
    )
}