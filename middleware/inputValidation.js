const { body } = require('express-validator');

exports.minionInputValidate = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Please name min length 3.')
    .matches(/^[a-zA-Z. ]+$/)
    .withMessage('Please enter valid name')
    .notEmpty()
    .withMessage('Please enter name'),
  body('age')
    .trim()
    .matches(/^[0-9.-]+$/)
    .withMessage('Age must be number')
    .notEmpty()
    .withMessage('Please enter age'),
  body('color')
    .trim()
    .isString()
    .withMessage('color is string')
    .notEmpty()
    .withMessage('Please enter color'),
];
