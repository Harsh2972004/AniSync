import passport from "passport";

const isAuthenticated = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: "unauthorized" });

    req.user = user; // attach user for controllers
    return next();
  })(req, res, next);
};

export default isAuthenticated;
