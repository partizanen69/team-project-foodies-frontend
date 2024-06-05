import { React, lazy, Suspense, useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import s from './App.module.scss'

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const Loader = lazy(() => import('./Loader/Loader'));
const Header = lazy(() => import('./Header/Header'));

export const App = () => {
  return (
    <div className={s.main_container}>
      <>
        <Header/>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainPage />}/> 
            <Route path="*" element={<MainPage />} />
          </Routes>
        </Suspense>
      </>
    </div>
  );
};
