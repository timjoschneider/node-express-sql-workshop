const { body, validationResult } = require('express-validator');

const userValidationRules = [
  body('first_name')
    .not()
    .isEmpty()
    .matches(/^[A-Za-z\s]+$/)
    .trim(),
  body('last_name')
    .not()
    .isEmpty()
    .matches(/^[A-Za-z\s]+$/)
    .trim(),
];

const userValidation = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  } else {
    return next();
  }
};

module.exports = {
  userValidation,
  userValidationRules,
};
