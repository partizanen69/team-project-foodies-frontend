import { React, lazy, Suspense} from 'react';
import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";

import s from './App.module.scss'

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const Loader = lazy(() => import('./Loader/Loader'));
const Container = lazy(() => import('./Container/Container'));

export const App = () => {
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
