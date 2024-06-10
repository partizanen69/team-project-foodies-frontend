import { React } from 'react';
import Container from 'components/Container/Container';
import s from './UserPage.module.scss';
import UserInfo from 'components/UserInfo/UserInfo';
import { Outlet } from 'react-router-dom';
import MainTitle from 'components/MainTitle/MainTitle';
import { PathInfo } from 'components/PathInfo/PathInfo';
import Subtitle from 'components/Subtitle/Subtitle';

const UserPage = () => {
  return (
    <Container className={s.main_container}>
      <PathInfo currentPageName="profile" />
      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>
      <UserInfo />
      <Outlet />
    </Container>
  );
};

UserPage.propTypes = {};

export default UserPage;
