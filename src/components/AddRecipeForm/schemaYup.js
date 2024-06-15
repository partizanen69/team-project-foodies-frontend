import * as yup from 'yup';

const schemaYup = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup
    .string()
    .max(200, 'Description must be at most 200 characters')
    .required('Description is required'),
  category: yup.string().required('Category is required'),
  time: yup
    .number()
    .min(1, 'Time must be at least 1 minute')
    .required('Time is required'),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        _id: yup.string().required('Ingredient id is required'),
        measure: yup.string().required('Measure is required'),
      })
    )
    .min(1, 'At least one ingredient is required'),
  instructions: yup
    .string()
    .max(200, 'Instructions must be at most 200 characters')
    .required('Instructions are required'),
});

export default schemaYup;
