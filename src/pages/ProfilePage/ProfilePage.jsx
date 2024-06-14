import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import s from './ProfilePage.module.scss';
import Container from 'components/Container/Container';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';
import { PathInfo } from 'components/PathInfo/PathInfo';

import ProfileInfo from 'pages/ProfilePage/ProfileInfo/ProfileInfo';
import ProfileTabs from './ProfileTabs/ProfileTabs';

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
        <ProfileTabs userId={id} isOwnProfile={isOwnProfile} />
      </div>
    </Container>
  );
};

export default ProfilePage;
