const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body, { abortEarly: false });
      req.body = validatedBody; // שמור את גוף הבקשה לאחר הולידציה
      next();
    } catch (err) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors
      });
    }
  };
};

module.exports = validate;
