import React from 'react';
import s from './ImageUpload.module.scss';

const ImageUpload = ({ handleImageChange, imagePreview }) => (
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
          <img src={imagePreview} alt="Recipe" className={s.recipe_image_preview} />
        </div>
      ) : (
        <div className={s.recipe_image_text}>
          <svg className='recipe_upload_icon' viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.881 22.8571V13.6959C56.8811 12.0825 56.2414 10.5349 55.1023 9.39238C53.9631 8.24982 52.4175 7.60551 50.8041 7.60067L41.643 7.57324M56.881 41.1428V50.2856C56.881 51.9022 56.2389 53.4525 55.0958 54.5956C53.9527 55.7387 52.4024 56.3809 50.7858 56.3809H41.643M23.3572 7.57324L14.1961 7.60372C12.5827 7.60856 11.0371 8.25287 9.89792 9.39543C8.7588 10.538 8.11913 12.0856 8.11914 13.699V22.8571M23.3572 56.3809H14.2144C12.5978 56.3809 11.0475 55.7387 9.90439 54.5956C8.76132 53.4525 8.11914 51.9022 8.11914 50.2856V41.1428" stroke="#050505" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32.5 37.5C33.75 37.5 34.8127 37.0627 35.688 36.188C36.5627 35.3127 37 34.25 37 33C37 31.75 36.5627 30.6873 35.688 29.812C34.8127 28.9373 33.75 28.5 32.5 28.5C31.25 28.5 30.1873 28.9373 29.312 29.812C28.4373 30.6873 28 31.75 28 33C28 34.25 28.4373 35.3127 29.312 36.188C30.1873 37.0627 31.25 37.5 32.5 37.5ZM24.5 41C23.95 41 23.4793 40.8043 23.088 40.413C22.696 40.021 22.5 39.55 22.5 39V27C22.5 26.45 22.696 25.9793 23.088 25.588C23.4793 25.196 23.95 25 24.5 25H27.65L29.5 23H35.5L37.35 25H40.5C41.05 25 41.521 25.196 41.913 25.588C42.3043 25.9793 42.5 26.45 42.5 27V39C42.5 39.55 42.3043 40.021 41.913 40.413C41.521 40.8043 41.05 41 40.5 41H24.5Z" fill="#050505" fillOpacity="0.3"/>
          </svg>
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
  </div>
);

export default ImageUpload;
