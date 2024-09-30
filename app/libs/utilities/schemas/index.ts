import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.


 export const autoPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required')
  });

  export const verifyPasswordSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Password must be at least 8 characters long').matches(passwordRules, {message: 'Password must contain atleast 1 upper case, 1 lower case, 1 numeric digit'}).required('Input generated password'),

    verify_password: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Input generated password')
  });

  export const onboardingSchema = Yup.object().shape({
    first_name: Yup.string().min(3, 'First name too short').max(80, 'First name too long').required('First name is required'),

    last_name: Yup.string().min(3, 'Last name too short').max(80, 'Last name too long').required('Last name is required'),

    email: Yup.string().email('Invalid email address').required('Email is required'),

    address: Yup.string().min(3, 'Residential adsress is too short').max(200, 'Residential is address too long').required('Residential address is required'),

    phone_number: Yup.number().positive().integer().required("Phone is required"),
  });


  export const next_of_kin_Schema = Yup.object().shape({
    Next_of_Kin_Name: Yup.string().min(3, 'Full name too short').max(120, 'Full name too long').required('Next of Kin Name is required'),

    email: Yup.string().email('Invalid email address').required('Email is required'),

    address: Yup.string().min(3, 'Next of Kin Address is too short').max(200, 'Next of Kin address is too long').required('Next of Kin Address is required'),

    phone_number: Yup.number().positive().integer().required("Phone is required"),
  });