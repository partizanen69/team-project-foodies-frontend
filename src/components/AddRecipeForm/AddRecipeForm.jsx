import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import schemaYup from './schemaYup';
import { getCategories } from '../../api/categories';
import { getAreasList } from '../../api/areas';
import { getIngredientsList } from '../../api/ingredients';
import { showError } from '../../api/api.utils';
import { addNewRecipe } from '../../api/recipes';
import { ReactComponent as CloseIcon } from '../../assets/icons/trash-light.svg';

import ImageUpload from './ImageUpload/ImageUpload';
import TitleInput from './TitleInput/TitleInput';
import DescriptionInput from './DescriptionInput/DescriptionInput';
import AreaSelect from './AreaSelect/AreaSelect';
import CategorySelect from './CategorySelect/CategorySelect';
import TimeInput from './TimeInput/TimeInput';
import InstructionsInput from './InstructionsInput/InstructionsInput';
import AddIngredient from './AddIngredient/AddIngredient';
import AddIngredientCard from './AddIngredientCard/AddIngredientCard';

import s from './AddRecipeForm.module.scss';

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaYup),
    defaultValues: {
      ingredients: [],
    },
  });

  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [ingredientCards, setIngredientCards] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useSelector(state => state.auth);
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
            id: card._id,
            measure: card.measure,
          }))
        )
      );
      
      await addNewRecipe(formData);
      toast.success('Recipe added successfully');

      if (user) {
        navigate(`/user/${user.id}`);
      }

    } catch (error) {
      toast.error(`Error occurred while adding new recipe: ${error.message}`);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', [file]);
    }
  };

  const handleMeasureChange = (e) => {
    setIsTyping(true);
  };

  const addIngredient = (selectedIngredient, measure) => {
    const ingredientExists = ingredientCards.some(card => card._id === selectedIngredient._id);
    if (ingredientExists) {
      toast.error('This ingredient is already added');
      return;
    }

    const newCard = {
      _id: selectedIngredient._id,
      name: selectedIngredient.name,
      measure: measure,
      img: selectedIngredient.img,
    };

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

      <div className={s.add_recipe_form_container}>
        <div>
          <ImageUpload
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            errors={errors}
          />
        </div>
      
        <div>
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

          <AreaSelect
            name="area"
            control={control}
            areas={areas}
            errors={errors}
            setValue={setValue}
          />

          <div className={s.add_recipe_form_inputs}>
            <CategorySelect
              name="category"
              control={control}
              categories={categories}
              errors={errors}
              setValue={setValue}
            />

            <TimeInput
              name="time"
              register={register}
              getValues={getValues}
              setValue={setValue}
              time={getValues('time')}
              errors={errors}
            />
          </div>

          <AddIngredient
            addIngredient={addIngredient}
            ingredientsList={ingredientsList}
            isTyping={isTyping}
            handleMeasureChange={handleMeasureChange}
            watch={watch}
            errors={errors}
            control={control}
            register={register}
          />
        
          <AddIngredientCard
            removeIngredientCard={removeIngredientCard}
            ingredientCards={ingredientCards}
          />
      
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
              onClick={() => {
                reset(); 
                setImagePreview(null);
                setIngredientCards([]);
              }}
            >
              <CloseIcon className={s.add_recipe_form_close_icon} />
            </button>
            <button className={s.add_recipe_form_publish_button} type="submit">
              Publish
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
