import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import schemaYup from './schemaYup';
import { getCategories } from '../../api/categories';
import { getAreasList } from '../../api/areas';
import { getIngredientsList } from '../../api/ingredients';
import { showError } from '../../api/api.utils';
import { addNewRecipe } from '../../api/recipes';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/trash-light.svg';

import ImageUpload from './ImageUpload/ImageUpload';
import TitleInput from './TitleInput/TitleInput';
import DescriptionInput from './DescriptionInput/DescriptionInput';
import AreaSelect from './AreaSelect/AreaSelect';
import CategorySelect from './CategorySelect/CategorySelect';
import TimeInput from './TimeInput/TimeInput';
import AddRecipeFormLabel from './AddRecipeFormLabel/AddRecipeFormLabel';
import InstructionsInput from './InstructionsInput/InstructionsInput';

import s from './AddRecipeForm.module.scss';

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaYup),
    defaultValues: {
      ingredients: [],
    },
  });
  // TODO: to remove
  console.log('errors', errors, getValues());

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
          getCategories(),
          getAreasList(),
          getIngredientsList(),
        ]);
        setCategories(categoriesData);
        setAreas(areasData);
        setIngredientsList(ingredientsData);
      } catch (error) {
        showError(
          `Error occurred while trying to get initial data: ${error.message}`
        );
      }
    };
    fetchInitialData();
  }, []);

  const onSubmit = async data => {
    console.log('asdfasdf', data);
    try {
      const formData = new FormData();
      const { image, title, description, category, area, time, instructions } =
        data;

      formData.append('thumb', image[0]);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('area', area);
      formData.append('time', time);
      formData.append('instructions', instructions);
      formData.append(
        'ingredients',
        JSON.stringify(
          ingredientCards.map(card => ({
            _id: card._id,
            measure: card.measure,
          }))
        )
      );

      await addNewRecipe(formData);
      toast.success('Recipe added successfully');

      navigate('/');
    } catch (error) {
      console.error('Error occurred while adding new recipe:', error);
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', [file]);
    }
  };

  const addIngredient = (selectedIngredient, measure) => {
    const newCard = {
      _id: selectedIngredient._id,
      name: selectedIngredient.name,
      measure: measure,
      img: selectedIngredient.img,
    };

    // TODO: to remove
    console.log('ingredientCards', ingredientCards);
    const newIngredients = [...ingredientCards, newCard];
    setValue('ingredients', newIngredients);
    setIngredientCards(newIngredients);
  };

  const removeIngredientCard = index => {
    const updatedCards = [...ingredientCards];
    updatedCards.splice(index, 1);
    setIngredientCards(updatedCards);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />

      <ImageUpload
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />

      <TitleInput
        name="title"
        register={register}
        errors={errors}
        title={getValues('title')}
      />

      <DescriptionInput
        name="description"
        register={register}
        watch={watch}
        errors={errors}
        maxLength={200}
        description={getValues('description')}
      />

      <CategorySelect
        name="category"
        control={control}
        categories={categories}
        errors={errors}
        setValue={setValue}
      />

      <AreaSelect
        name="area"
        control={control}
        areas={areas}
        errors={errors}
        setValue={setValue}
      />

      <TimeInput
        name="time"
        register={register}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
        time={getValues('time')}
      />

      <div className={s.add_recipe_form_ingredients}>
        <Controller
          name="selectedIngredient"
          control={control}
          render={({ field }) => (
            <div className={s.add_recipe_form_ingredient_input}>
              <AddRecipeFormLabel>Ingredients</AddRecipeFormLabel>

              <div className={s.add_recipe_form_ingredient_select_wrap}>
                <select
                  {...field}
                  className={`${s.add_recipe_form_ingredient_input_select} ${
                    field.value === ''
                      ? s.ingredient_placeholder
                      : s.ingredient_selected
                  }`}
                >
                  <option
                    key="default"
                    value=""
                    className={s.add_recipe_form_ingredient_input_option}
                  >
                    Add the ingredient
                  </option>
                  {ingredientsList.map(ingredient => (
                    <option
                      key={ingredient._id}
                      value={ingredient._id}
                      className={
                        s.add_recipe_form_ingredient_input_ingredient_option
                      }
                    >
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  {...register('measure')}
                  placeholder="Enter quantity"
                  className={s.add_recipe_form_ingredient_input_measure}
                />
              </div>

              <button
                className={s.add_recipe_form_ingredient_input_button}
                type="button"
                onClick={() => {
                  const selectedIngredient = ingredientsList.find(
                    ing => ing._id === watch('selectedIngredient')
                  );
                  const measure = watch('measure');
                  if (selectedIngredient && measure) {
                    addIngredient(selectedIngredient, measure);
                  } else {
                    toast.error('Please enter quantity');
                  }
                }}
              >
                <span>Add ingredient </span>
                <PlusIcon
                  className={s.add_recipe_form_ingredient_input_button_icon}
                />
              </button>
            </div>
          )}
        />
      </div>

      <div>
        {ingredientCards.map((card, index) => (
          <div key={`ingredient-card-${index}`}>
            <img src={card.img} alt={card.name} />
            <div>
              <h4>{card.name}</h4>
              <p>Measure: {card.measure}</p>
              <button type="button" onClick={() => removeIngredientCard(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <InstructionsInput
        name="instructions"
        register={register}
        watch={watch}
        errors={errors}
        maxLength={200}
        description={getValues('instructions')}
      />

      <div className={s.add_recipe_form_actions}>
        <button
          className={s.add_recipe_form_close_button}
          onClick={() => window.location.reload()}
        >
          <CloseIcon className={s.add_recipe_form_close_icon} />
        </button>
        <button className={s.add_recipe_form_publish_button} type="submit">
          Publish
        </button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
