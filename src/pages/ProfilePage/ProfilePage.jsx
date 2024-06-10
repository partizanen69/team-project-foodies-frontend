import { React } from 'react';
import { Outlet } from 'react-router-dom';

import s from './ProfilePage.module.scss';
import Container from 'components/Container/Container';

import { PathInfo } from 'components/PathInfo/PathInfo';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';

import ProfileInfo from 'components/ProfileInfo/ProfileInfo';

const ProfilePage = () => {
  return (
    <Container className={s.main_container}>
      <PathInfo currentPageName="profile" />

      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>

      <div className={s.main_content}>
        <ProfileInfo />

        <ul>
          <li>My recipes</li>
          <li>My favorites</li>
          <li>Followers</li>
          <li>Following</li>
        </ul>
      </div>

      <Outlet />
    </Container>
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
