import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../../api/categories.js';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import CategoryList from '../CategoryList/CategoryList';
import { toast } from 'react-toastify';
import styles from './Categories.module.scss';
import { useDispatch } from 'react-redux';
import { setCategoryFilter } from '../../redux/actions/filtersActions.js';

const Categories = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [allCategoriesLoaded, setAllCategoriesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(categories => {
        setCategories(categories);
        setIsLoading(false);
      })
      .catch(err => {
        toast.error(`Failed to fetch catagories. ${err.message}`);
      });
  }, []);

  const handleCategoryClick = categoryName => {
    dispatch(setCategoryFilter(categoryName))
  };

  const handleAllCategoriesClick = async () => {
    try {
      const allCategories = await getCategories({ all: true });
      setCategories(allCategories);
      setAllCategoriesLoaded(true);
    } catch (err) {
      toast.error(`Failed to fetch all catagories. ${err.message}`);
    }
  };

  return (
    <section className={styles.container}>
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
        {!isLoading && (
          <CategoryList
            categories={categories}
            onCategoryClick={handleCategoryClick}
            onAllCategoriesClick={handleAllCategoriesClick}
            allCategoriesLoaded={allCategoriesLoaded}
          />
        )}
      </div>
    </section>
  );
};

Categories.propTypes = {
  onCategorySelected: PropTypes.func,
};

export default Categories;
