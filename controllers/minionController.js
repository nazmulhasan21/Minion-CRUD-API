const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Minion = require('../models/minionModel');

const AppError = require('../utils/appError');

// create a minion

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }

    const { name, age, color } = req.body;

    // 1. add minion
    const minion = await Minion.create({
      name,
      age,
      color,
    });
    // 2. send res
    res.status(200).json({
      status: 'success',
      message: 'Minion create successful',
      minion,
    });
  } catch (error) {
    next(error);
  }
};

// update a minion

exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const minionId = req.params.id;
    // 1. check mongoose id
    const isValid = mongoose.Types.ObjectId.isValid(minionId);
    if (!isValid) return next(new AppError(400, '_id', 'Id is not valid '));

    const updateMinion = await Minion.findByIdAndUpdate(minionId, req.body, {
      new: true,
      runValidators: true,
    });

    // 2. send res
    res.status(200).json({
      status: 'success',
      message: 'Minion update successful',
      minion: updateMinion,
    });
  } catch (error) {
    next(error);
  }
};

// get all Minion

exports.getAll = async (req, res, next) => {
  try {
    const minions = await Minion.find();

    res.status(200).json({
      status: 'success',
      minions,
    });
  } catch (error) {
    next(error);
  }
};

// get one minion
exports.getOne = async (req, res, next) => {
  try {
    const minionId = req.params.id;
    // 1. check mongoose id
    const isValid = mongoose.Types.ObjectId.isValid(minionId);
    if (!isValid) return next(new AppError(400, '_id', 'Id is not valid '));
    // 2. find minion by id
    const minion = await Minion.findById(minionId);
    if (!minion)
      return next(new AppError(404, 'minion', 'Not found any minion'));

    // 3. send res
    res.status(200).json({
      status: 'success',
      message: 'Minion found',
      minion,
    });
  } catch (error) {
    next(error);
  }
};

// delete one minion

// get one minion
exports.delete = async (req, res, next) => {
  try {
    const minionId = req.params.id;
    // 1. check mongoose id
    const isValid = mongoose.Types.ObjectId.isValid(minionId);
    if (!isValid) return next(new AppError(400, '_id', 'Id is not valid '));
    // 2. find minion by id
    const minion = await Minion.findById(minionId);
    if (!minion)
      return next(new AppError(404, 'minion', 'Not found any minion'));

    // 3. delete
    await Minion.findByIdAndDelete(minionId);

    // 4. send res
    res.status(200).json({
      status: 'success',
      message: 'Minion delete successful',
      minion,
    });
  } catch (error) {
    next(error);
  }
};
