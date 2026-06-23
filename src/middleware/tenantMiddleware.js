export const tenantMiddleware = (req, res, next) => {
  try {
    if (!req.schoolId) {
      console.log(req.schoolId)
      return res.status(400).json({
        success: false,
        message: "School context missing",
      });
    }

    // attach schoolId globally
    req.schoolId = req.user.schoolId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tenant error",
    });
  }
};
export default tenantMiddleware;