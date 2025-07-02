const express = require('express');
const Discount = require('../models/discountModel');
const yup = require('yup');

// סכמת ולידציה פשוטה עם yup
const discountSchema = yup.object({
  value: yup.number().min(0).max(100).required()
});

const updateDiscount = async (req, res) => {
  try {
    await discountSchema.validate(req.body); 

    const updated = await Discount.findOneAndUpdate(
      {},                            // עדכון המסמך היחיד שקיים
      { value: req.body.value },
      { new: true, upsert: true }    // יוצר אם לא קיים
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.error(err);
  }
}

const getDiscount = async (req, res) => {
  try {
    const discount = await Discount.findOne();
    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch discount' });
    console.error(err);
  }
}

module.exports = {
  updateDiscount,
  getDiscount
};
