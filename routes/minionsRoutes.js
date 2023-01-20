const express = require('express');
const router = express.Router();

const minionController = require('../controllers/minionController');
const { minionInputValidate } = require('../middleware/inputValidation');

router
  .route('/')
  .post(minionInputValidate, minionController.create)
  .get(minionController.getAll);

router
  .route('/:id')
  .get(minionController.getOne)
  .patch(minionInputValidate, minionController.update)
  .delete(minionController.delete);

module.exports = router;
