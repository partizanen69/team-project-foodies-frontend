import { React } from 'react';
import { Outlet } from 'react-router-dom';

import s from './ProfilePage.module.scss';
import Container from 'components/Container/Container';

import { PathInfo } from 'components/PathInfo/PathInfo';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';

import UserInfo from 'components/ProfileInfo/ProfileInfo';

const ProfilePage = () => {
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

ProfilePage.propTypes = {};

export default ProfilePage;
