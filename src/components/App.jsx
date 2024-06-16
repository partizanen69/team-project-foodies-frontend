import { React, lazy, Suspense, useEffect, startTransition } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setIsMainPage } from '../redux/reducers/uiReducer';
import { SharedLayout } from './SharedLayout';

import s from './App.module.scss';

const UserRecipes = lazy(() =>
  import('pages/ProfilePage/UserRecipes/UserRecipes')
);
const MyFavorites = lazy(() =>
  import('pages/ProfilePage/MyFavorites/MyFavorites')
);
const UserFollowers = lazy(() =>
  import('pages/ProfilePage/UserFollowers/UserFollowers')
);
const UserFollowing = lazy(() =>
  import('pages/ProfilePage/UserFollowing/UserFollowing')
);
const AddRecipePage = lazy(() => import('pages/AddRecipePage/AddRecipePage'));
const Recipe = lazy(() => import('../pages/Recipe/Recipe'));
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
              <Route path="recipies" element={<UserRecipes />} />
              <Route path="favorites" element={<MyFavorites />} />
              <Route path="followers" element={<UserFollowers />} />
              <Route path="following" element={<UserFollowing />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Container>
  );
};
