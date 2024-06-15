import { getUserRecipes } from 'api/recipes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserRecipes = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [totalRecipes, setTotalRecipes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

  useEffect(() => {
    (async () => {
      if (id && isOwnProfile) {
        const result = await getUserRecipes();
        console.log(result);
      } else {
        console.log('fetch user recipes');
      }
    })();
  }, [isOwnProfile, id]);

  return <div>Recipes</div>;
};

export default UserRecipes;
