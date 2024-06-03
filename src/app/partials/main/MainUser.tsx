"use client";
import React from 'react';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MainUser() {
  function darkMode() {
    var element = document.body;
    element.classList.toggle("darkMode");
  }
  const [value, setValue] = React.useState<number | null>(5);
  return (
    <>
      <input className='navigation' placeholder='Buscar Producto'></input>
      <button className='buscar'>GO</button>
      <div className='admin'>
        <p className='adminletra'>User</p></div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>
      <br></br>
      <h1 className='subtitulo'>Auriculares</h1>
      <div className='Auriculares'>
        <a href="https://www.mercadolibre.com.ar/auriculares-gamer-nisuta-nsaug300-negro-y-azul/p/MLA15317091#searchVariation=MLA15317091&position=17&search_layout=stack&type=product&tracking_id=5939455b-3284-499b-9db3-18a0989a6883"  > <img className='img' src="./img/nisuta.webp" />
          Auriculares gamer Nisuta NSAUG300
          <h1>$35.054</h1>
        </a>
        <a href="https://www.mercadolibre.com.ar/auriculares-gamer-inalambricos-logitech-g-g-series-g435-g435-negro-y-amarillo-fluorescente-con-luz-azul-turquesa/p/MLA18651916?pdp_filters=category:MLA6049#searchVariation=MLA18651916&position=11&search_layout=stack&type=product&tracking_id=0bec4b49-b29d-473f-9804-3afb26536f6b"  > <img className='img' src="./img/logitech.webp" />
          Auriculares gamer inalámbricos Logitech G Series G435
          <h1>$150.799</h1>
        </a>
      </div>

      <br />

      <h1 className='subtitulo'>Teclados</h1>
      <div className='Teclados'>
        <a href="https://www.mercadolibre.com.ar/teclado-gamer-redragon-kumara-k552-qwerty-espanol-latinoamerica-color-negro-con-luz-rgb/p/MLA19472215?pdp_filters=category:MLA418448#searchVariation=MLA19472215&position=7&search_layout=stack&type=product&tracking_id=853d3b61-16f4-4ad5-a355-e0a089be478a"  > <img className='imgred' src="./img/reddragon.jpg" />
          Teclado gamer Redragon Kumara K552 QWERTY
          <h1>$70.991,83</h1>
        </a>
        <a href="https://www.mercadolibre.com.ar/logitechpro-teclado-gamer-edicion-especial-league-of-legends-idioma-ingles-us-color-negro/p/MLA24529871?pdp_filters=category:MLA418448#searchVariation=MLA24529871&position=36&search_layout=stack&type=product&tracking_id=db1dcf30-aa72-44e5-a54b-c53613f0871c"  > <img className='imglol' src="./img/LOL.jpg" />
          Logitech pro Teclado Gamer Edición Especial League Of Legends
          <h1>$172.199</h1>
        </a>
      </div>

      <br />

      <h1 className='subtitulo'>Sillas</h1>
      <div className='Sillas'>
        <a href="https://www.mercadolibre.com.ar/auriculares-gamer-nisuta-nsaug300-negro-y-azul/p/MLA15317091#searchVariation=MLA15317091&position=17&search_layout=stack&type=product&tracking_id=5939455b-3284-499b-9db3-18a0989a6883"  > <img className='img' src="./img/nisuta.webp" />
          Auriculares gamer Nisuta NSAUG300
          <h1>$120.000</h1>
        </a>
        <a href="https://www.mercadolibre.com.ar/auriculares-gamer-inalambricos-logitech-g-g-series-g435-g435-negro-y-amarillo-fluorescente-con-luz-azul-turquesa/p/MLA18651916?pdp_filters=category:MLA6049#searchVariation=MLA18651916&position=11&search_layout=stack&type=product&tracking_id=0bec4b49-b29d-473f-9804-3afb26536f6b"  > <img className='img' src="./img/logitech.webp" />
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