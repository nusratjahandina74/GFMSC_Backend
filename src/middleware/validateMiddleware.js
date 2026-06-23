const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error.issues?.[0]?.message ||
          "Validation failed",
      });
    }
  };
};

export default validate;