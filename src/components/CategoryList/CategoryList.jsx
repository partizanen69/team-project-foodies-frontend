import React from 'react';
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
  const getCategoryCardSize = index => {
    if (window.innerWidth < 768) {
      return 'small';
    } else if (window.innerWidth >= 768 && window.innerWidth < 1440) {
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
    <div className={styles.list}>
      {categories.map((category, index) => (
        <CategoryCard
          key={category._id}
          imgUrl={backendUrl + category.imgUrl}
          name={category.name}
          size={getCategoryCardSize(index)}
          onClick={() => onCategoryClick(category._id)}
        />
      ))}
      <div className={styles.allCategories}>
        <button onClick={onAllCategoriesClick}>ALL CATEGORIES</button>
      </div>
    </div>
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
