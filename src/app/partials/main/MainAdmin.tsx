"use client";
import React from 'react';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MainAdmin() {
    function darkMode() {
        var element = document.body;
        element.classList.toggle("darkMode");
    }
    const [value, setValue] = React.useState<number | null>(5);
    return (
<>
<input className='navigation' placeholder='Buscar Producto'></input>
<button className='buscar'>GO</button>
<div className='admin'>Admin</div>
<div className='fondodark'>
<div>Dark mode</div>
<Switch  onChange={darkMode} className='switch'  form="flexSwitchCheckChecked" />
   </div>
    <br></br>
      <div className='fondoimg'>
   <a href="https://www.mercadolibre.com.ar/auriculares-gamer-nisuta-nsaug300-negro-y-azul/p/MLA15317091#searchVariation=MLA15317091&position=17&search_layout=stack&type=product&tracking_id=5939455b-3284-499b-9db3-18a0989a6883"  > <img className='img' src="./img/nisuta.webp"  /> 
    Auriculares gamer Nisuta NSAUG300   
    <h1>$120.000</h1>
    </a>
   
  <a href="https://www.mercadolibre.com.ar/auriculares-gamer-nisuta-nsaug300-negro-y-azul/p/MLA15317091#searchVariation=MLA15317091&position=17&search_layout=stack&type=product&tracking_id=5939455b-3284-499b-9db3-18a0989a6883"  > <img className='img' src="./img/nisuta.webp"  /> 
    Auriculares gamer Nisuta NSAUG300  
     <h1>$120.000</h1>
     </a>
   
   
  </div>
  <Box
      className='rating'
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">¡Deja tu opinión!</Typography>
<Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
</Box> 
        </>
        
    )
}