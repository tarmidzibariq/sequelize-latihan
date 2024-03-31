const isSuperAdmin = () => {
  return (req, res, next) => {
    console.log(req.user);
    try {
      if (req.user.role !== "SuperAdmin") {
        throw { code: 403, message: "Forbidden!" };
      }

      //lanjut ke request selanjutnya
      next();
    } catch (err) {
      res.status(err.code).json(err);
    }
  };
};

module.exports = isSuperAdmin;
