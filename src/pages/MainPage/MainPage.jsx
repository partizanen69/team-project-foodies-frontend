import {React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container/Container';

import s from './MainPage.module.scss';

const MainPage = () => {
  return (
      <Container>
        <div className={s.title_container}>
            <p className={s.title}>MAIN PAGE</p>
          </div>
      </Container>
  );
};

MainPage.propTypes = {
};

export default MainPage;