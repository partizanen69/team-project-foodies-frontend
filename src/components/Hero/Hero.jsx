import {React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container/Container';


import s from './Hero.module.scss';

const Hero = () => {
    return (
      <Container className={s.hero_container} style={{borderRadius: '20px'}}>
        <div className={s.hero_content}>
          <h1  className={s.hero_title}>IMPROVE YOUR <br className={s.break}/> CULINARY TALENTS</h1>
          <p className={s.hero_text}>Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.</p>
          <button className={s.hero_button}>ADD RECIPE</button>
          <div className={s.images}>
          {/* <img
            className={s.image_main}
            srcSet={`${heroFood1} 1x, ${heroFood2} 2x, ${heroFood2} 3x, ${heroFood2} 4x`}
            src={heroFood1}
            alt="Description"
          /> */}
           <div className={s.image_main}></div>  
            <div className={s.image_secondary}></div> 
            {/* <img src={heroFood1} alt="Dish 1" className={s.image_main} />
            <img src={heroDessert1} alt="Dish 2" className={s.image_secondary} /> */}
          </div>
        </div>
      </Container>
    );
  };
  
export default Hero;