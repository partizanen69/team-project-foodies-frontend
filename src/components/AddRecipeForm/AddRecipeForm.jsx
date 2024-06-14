import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import schemaYup from './schemaYup';
import { getCategoriesList } from '../../api/categories';
import { getAreasList } from '../../api/areas';
import { getIngredientsList } from '../../api/ingredients';
import { showError } from '../../api/api.utils';
import { addNewRecipe } from '../../api/recipes';

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaYup),
    defaultValues: {
      ingredients: []
    }
  });

  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [ingredientCards, setIngredientCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, areasData, ingredientsData] = await Promise.all([
          getCategoriesList(),
          getAreasList(),
          getIngredientsList(),
        ]);
        setCategories(categoriesData);
        setAreas(areasData);
        setIngredientsList(ingredientsData);
      } catch (error) {
        showError(`Error occurred while trying to get initial data: ${error.message}`);
      }
    };
    fetchInitialData();
  }, []);

  const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    const { image, title, description, category, area, time, instructions } = data;

    formData.append('thumb', image[0]);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('area', area);
    formData.append('time', time);
    formData.append('instructions', instructions);
    formData.append('ingredients', JSON.stringify(ingredientCards.map(card => ({
      _id: card._id,
      measure: card.measure,
    }))));

    await addNewRecipe(formData);
    navigate('/');
  } catch (error) {
    console.error('Error occurred while adding new recipe:', error);
    alert('An error occurred: ' + error.message);
  }
};

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', [file]);
    }
  };

  const incrementTime = () => {
    const currentValue = getValues('time') || 0;
    setValue('time', currentValue + 1);
  };

  const decrementTime = () => {
    const currentValue = getValues('time') || 0;
    if (currentValue - 1 >= 0) {
      setValue('time', currentValue - 1);
    } else {
      setValue('time', 0);
    }
  };

  const addIngredient = (selectedIngredient, measure) => {
    const newCard = {
      _id: selectedIngredient._id,
      name: selectedIngredient.name,
      measure: measure,
      img: selectedIngredient.img,
    };

    setIngredientCards([...ingredientCards, newCard]);
  };

  const removeIngredientCard = (index) => {
    const updatedCards = [...ingredientCards];
    updatedCards.splice(index, 1);
    setIngredientCards(updatedCards);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Recipe Image</label>
        <input type="file" accept="image" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Recipe" />}
      </div>

      <div>
        <label>Title</label>
        <input type="text" {...register('title')} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register('description')} maxLength="200" />
        <p>{watch('description')?.length || 0}/200</p>
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option key="default" value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>{category.name}</option>
              ))}
            </select>
          )}
        />
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label>Area</label>
        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option key="default" value="">Select an area</option>
              {areas.map((area, index) => (
                <option key={index} value={area.id}>{area.name}</option>
              ))}
            </select>
          )}
        />
        {errors.area && <p>{errors.area.message}</p>}
      </div>

      <div>
        <label>Time (minutes)</label>
        <div>
          <button type="button" onClick={decrementTime}>-</button>
          <input type="number" {...register('time')} readOnly />
          <button type="button" onClick={incrementTime}>+</button>
        </div>
        {errors.time && <p>{errors.time.message}</p>}
      </div>

      <div>
        <Controller
          name="selectedIngredient"
          control={control}
          render={({ field }) => (
            <>
              <select {...field}>
                <option key="default" value="">Select an ingredient</option>
                {ingredientsList.map(ingredient => (
                  <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
                ))}
              </select>
              <input type="text" {...register('measure')} placeholder="Measure" />
              <button type="button" onClick={() => {
                const selectedIngredient = ingredientsList.find(ing => ing._id === watch('selectedIngredient'));
                const measure = watch('measure');
                if (selectedIngredient && measure) {
                  addIngredient(selectedIngredient, measure);
                }
              }}>Add ingredient+</button>
            </>
          )}
        />
      </div>

      <div>
        <label>Ingredients</label>
        {ingredientCards.map((card, index) => (
          <div key={`ingredient-card-${index}`}>
            <img src={card.img} alt={card.name} />
            <div>
              <h4>{card.name}</h4>
              <p>Measure: {card.measure}</p>
              <button type="button" onClick={() => removeIngredientCard(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label>Instructions</label>
        <textarea {...register('instructions')} maxLength="200" />
        <p>{watch('instructions')?.length || 0}/200</p>
        {errors.instructions && <p>{errors.instructions.message}</p>}
      </div>

      <div>
        <button type="button" onClick={() => window.location.reload()}>Clear</button>
        <button type="submit">Publish</button>
      </div>
    </form>
  );
};

export default AddRecipeForm;