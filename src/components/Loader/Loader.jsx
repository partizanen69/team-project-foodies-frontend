import React from 'react';
import s from './Loader.module.scss';

const Loader = () => {

return (<div className={s.loader}>
  <span>F</span>
  <span>o</span>
  <span>o</span>
  <span>d</span>
  <span>i</span>
  <span>e</span>
  <span>s</span>
  
 <div className={ s.covers}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>)
};

export default Loader;