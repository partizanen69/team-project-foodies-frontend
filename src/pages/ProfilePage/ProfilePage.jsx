import { Outlet, useParams } from 'react-router-dom';

import s from './ProfilePage.module.scss';
import Container from 'components/Container/Container';

import { PathInfo } from 'components/PathInfo/PathInfo';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';

import ProfileInfo from 'components/ProfileInfo/ProfileInfo';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

  return (
    <Container className={s.main_container}>
      <PathInfo currentPageName="profile" />

      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>

      <div className={s.main_content}>
        <ProfileInfo userId={id} isOwnProfile={isOwnProfile} />

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

export default ProfilePage;