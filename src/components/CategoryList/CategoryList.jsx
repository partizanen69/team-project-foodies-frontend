import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './CategoryList.module.scss';

const backendUrl =
  process.env.REACT_APP_BACKEND && process.env.REACT_APP_BACKEND.endsWith('api')
    ? process.env.REACT_APP_BACKEND.slice(0, -3)
    : 'http://localhost:3001/';

const CategoryList = ({
  categories,
  onCategoryClick,
  onAllCategoriesClick,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCategoryCardSize = index => {
    if (windowWidth < 768) {
      return 'small';
    } else if (windowWidth >= 768 && windowWidth < 1440) {
      if (index < 3) {
        return index === 2 ? 'large' : 'small';
      }
      const modIndex = (index - 3) % 5;
      return modIndex === 4 ? 'large' : 'small';
    } else {
      const row = Math.floor(index / 3);
      const position = index % 3;
      if (row % 3 === 0) {
        return position === 2 ? 'large' : 'small';
      } else if (row % 3 === 1) {
        return position === 0 ? 'large' : 'small';
      } else {
        return position === 1 ? 'large' : 'small';
      }
    }
  };

  return (
    <ul className={styles.list}>
      {categories.map((category, index) => (
        <li key={category._id}>
          <CategoryCard
            imgUrl={backendUrl + category.imgUrl}
            name={category.name}
            size={getCategoryCardSize(index)}
            onClick={() => onCategoryClick(category._id)}
          />
        </li>
      ))}
      <li className={styles.allCategories}>
        <button onClick={onAllCategoriesClick}>ALL CATEGORIES</button>
      </li>
    </ul>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onAllCategoriesClick: PropTypes.func.isRequired,
};

export default CategoryList;
