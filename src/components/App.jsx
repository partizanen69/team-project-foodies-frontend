import { React, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';

import s from './App.module.scss';
import axios from 'axios';
import { getRecipes } from '../api/recipes';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const Loader = lazy(() => import('./Loader/Loader'));
const Container = lazy(() => import('./Container/Container'));

axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND || 'http://localhost:3000/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const App = () => {
  useEffect(() => {
    getRecipes().then(recipes => {
      console.log('recipes', recipes);
    });
  }, []);
  return (
    <Container className={s.app_container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<MainPage />} />
            <Route path="*" element={<MainPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Container>
  );
};
