import { React, lazy, Suspense, useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Loader from './Loader/Loader'

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />}/> 
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
