import { React, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';

import s from './App.module.scss';
import axios from 'axios';
import Recipe from '../pages/Recipe/Recipe';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));
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
  // this is an example of doing http requests
  // useEffect(() => {
  //   getRecipes().then(recipes => {
  //     console.log('recipes', recipes);
  //   });
  // }, []);
  return (
    <Container className={s.app_container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" element={<MainPage />} />
            <Route path="/user/:id" element={<ProfilePage />}>
              {/* <Route path="/user/:id/my-recipies" element={} />
              <Route path="/user/:id/favorites" element={} />
              <Route path="/user/:id/followers" element={} />
              <Route path="/user/:id/following" element={} /> */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Container>
  );
};
