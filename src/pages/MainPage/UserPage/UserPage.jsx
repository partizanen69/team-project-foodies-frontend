import { React } from 'react';
import Container from 'components/Container/Container';
import s from './UserPage.module.scss';
import UserInfo from 'components/UserInfo/UserInfo';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <Container className={s.main_container}>
      User Page
      <UserInfo />
      <Outlet />
    </Container>
  );
};

UserPage.propTypes = {};

export default UserPage;
