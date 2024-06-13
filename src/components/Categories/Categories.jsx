import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../../api/categories.js';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import CategoryList from '../CategoryList/CategoryList';
import styles from './Categories.module.scss';

const Categories = ({ onCategorySelected }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then(categories => {
      setCategories(categories);
    });
  }, []);

  const handleCategoryClick = categoryId => {};

  const handleAllCategoriesClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <div className={styles.categoriesHead}>
          <MainTitle>Categories</MainTitle>
          <div className={styles.subtitle}>
            <Subtitle>
              Discover a limitless world of culinary possibilities and enjoy
              exquisite recipes that combine taste, style and the warm
              atmosphere of the kitchen.
            </Subtitle>
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
          onAllCategoriesClick={handleAllCategoriesClick}
        />
      </div>
    </div>
  );
};

Categories.propTypes = {
  onCategorySelected: PropTypes.func.isRequired,
};

export default Categories;
