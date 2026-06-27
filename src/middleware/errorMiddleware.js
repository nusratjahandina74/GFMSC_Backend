export const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  if (res.headersSent) {
    return next(err);
  }

  const isZodError =
    err?.name === "ZodError" ||
    Array.isArray(err?.issues);

  const statusCode =
    err?.statusCode ||
    (isZodError ? 400 : 500);

  return res.status(statusCode).json({
    success: false,
    message:
      isZodError
        ? err.issues?.[0]?.message ||
          "Validation failed"
        : err.message ||
          "Internal Server Error",
    errors: isZodError
      ? err.issues
      : undefined,
  });
};
