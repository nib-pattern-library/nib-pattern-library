
/**
 * Validate the form
 * @param   {string} fieldName
 * @param   {string} fieldValue
 * @returns {boolean|string}
 */
export default function(fieldName, fieldValue) { //TODO: use a validation package

  switch (fieldName) {

    case 'title':
      if (fieldValue === '') return 'Please choose your title.';
      break;

    case 'name':
      if (fieldValue === '') return 'Please enter your name so we can personalise your experience.';
      break;

    case 'phone':
      if (fieldValue === '') return 'Please enter your phone number so we can call you.';
      break;

    case 'email':
      if (fieldValue === '') return 'Please enter your email address so we can contact you.';
      break;

    case 'gender':
      console.log(fieldValue);
      if (fieldValue === '') return 'Please choose your gender.';
      if (fieldValue === 'male') return 'Please choose a better gender.';
      break;

    default:
      return 'Unknown field.';

  }

  return true;
}
