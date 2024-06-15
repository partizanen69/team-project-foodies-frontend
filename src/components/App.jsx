import { React, lazy, Suspense, useEffect, startTransition } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setIsMainPage } from '../redux/reducers/uiReducer';
import { SharedLayout } from './SharedLayout';
import Recipe from '../pages/Recipe/Recipe';
import AddRecipePage from 'pages/AddRecipePage/AddRecipePage';

import s from './App.module.scss';
import UserRecipes from 'pages/ProfilePage/UserRecipes/UserRecipes';
import MyFavorites from 'pages/ProfilePage/MyFavorites/MyFavorites';
import UserFollowers from 'pages/ProfilePage/UserFollowers/UserFollowers';
import UserFollowing from 'pages/ProfilePage/UserFollowing/UserFollowing';

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
  const dispatch = useDispatch();
  const location = useLocation();

  const isMainPage = useSelector(state => state.ui.isMainPage);

  useEffect(() => {
    startTransition(() => {
      if (
        location.pathname === '/' ||
        location.pathname === '/team-project-foodies-frontend'
      ) {
        dispatch(setIsMainPage(true));
      } else {
        dispatch(setIsMainPage(false));
      }
    });
  }, [location, dispatch]);

  return (
    <Container
      className={isMainPage ? s.app_container__for_main : s.app_container}
    >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" element={<MainPage />} />
            <Route path="/add" element={<AddRecipePage />} />


            <Route path="/user/:id" element={<ProfilePage />}>
              <Route path="/user/:id/recipies" element={<UserRecipes />} />
              <Route path="/user/:id/favorites" element={<MyFavorites />} />
              <Route path="/user/:id/followers" element={<UserFollowers />} />
              <Route path="/user/:id/following" element={<UserFollowing />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Container>
  );
};
