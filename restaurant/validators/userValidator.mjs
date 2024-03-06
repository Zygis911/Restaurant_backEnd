import { checkSchema , param} from "express-validator";

export const userValidationSchema = checkSchema({
  username: {
    isLength: {
      options: { min: 6, max: 32 },
      errorMessage: "username must be between 6 or 32 characters in length",
    },
    notEmpty: {
      errorMessage: "user cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    isLength: {
      options: { min: 8, max: 128 },
      errorMessage: "Password must be between 8 - 128 characters",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>]{8,128}$/,
      errorMessage:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
  },
  email: {
    isEmail: {
      errorMessage: " email must be valid",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
});
export const updateUserFieldsValidationSchema = checkSchema({
  username: {
    isLength: {
      options: { min: 6, max: 32 },
      errorMessage: "username must be between 6 or 32 characters in length",
    },
    notEmpty: {
      errorMessage: "user cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    isLength: {
      options: { min: 8, max: 128 },
      errorMessage: "Password must be between 8 - 128 characters",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>]{8,128}$/,
      errorMessage:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
  },
  email: {
    isEmail: {
      errorMessage: " email must be valid",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
});

export const validateUserId = [
  param("id")
    .isInt()
    .withMessage("ID must be an integer")
];


// rezervacijoms kitam git'e kodas!!
export const validateReservationParams = [
    param('userId')
    .isInt()
    .withMessage("user id must be an integer"),
    param('bookId')
    .isInt()
    .withMessage("book id must be an integer"),
];