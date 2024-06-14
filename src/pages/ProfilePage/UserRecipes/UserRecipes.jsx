import { getUserRecipes } from 'api/recipes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MyRecipes = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

  useEffect(() => {
    (async () => {
      // Corrected syntax here
      if (id && isOwnProfile) {
        const result = await getUserRecipes();
        console.log(result);
      } else {
        console.log('fetch user recipes');
      }
    })();
  }, [isOwnProfile, id]); // Added 'id' to the dependency array

  return <div>MyRecipes</div>;
};

export default MyRecipes;
