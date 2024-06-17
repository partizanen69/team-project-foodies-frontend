import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import s from './ImageUpload.module.scss';
import Icon from 'components/Icon/Icon';

const ImageUpload = ({ handleImageChange, imagePreview, errors }) => (
  <div className={s.upload_container}>
    <label htmlFor="image-upload" className={s.recipe_image_container}>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageChange}
        className={s.recipe_image_input}
      />
      {imagePreview ? (
        <div className={s.recipe_image_preview_container}>
          <img
            src={imagePreview}
            alt="Recipe"
            className={s.recipe_image_preview}
          />
        </div>
      ) : (
        <div className={s.recipe_image_text}>
          <Icon name="icon-upload" className={s.recipe_upload_icon} />
          <p>Upload a photo</p>
        </div>
      )}
    </label>
    {imagePreview && (
      <div className={s.upload_again_container}>
        <label htmlFor="image-upload" className={s.upload_again}>
          Upload another photo
        </label>
      </div>
    )}
    <ErrorMessage error={errors?.image} />
  </div>
);

export default ImageUpload;
