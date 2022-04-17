import passwordJwt from 'passport-jwt';

export default function initializeJWT({ passport, secretOrKey, getOneUser }) {
  const JwtStrategy = passwordJwt.Strategy,
    ExtractJwt = passwordJwt.ExtractJwt;

  const opts = {
    secretOrKey,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      ExtractJwt.fromUrlQueryParameter('t'),
    ]),
  };

  passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const exist = await getOneUser({
        email: jwt_payload.email,
        role: jwt_payload.role,
      });

      const isLoginExpired =
        new Date().getTime() >
        new Date(exist.last_login_at).getTime() +
          parseInt(process.env.LOGIN_EXPIRES_IN) * 60 * 1000;

      if (
        !exist ||
        !exist.is_logged_in ||
        isLoginExpired ||
        !exist.is_active ||
        exist.password.slice(0, 10) !== jwt_payload.ref //in case user reset password, so hacker cannot use prev token
      ) {
        return done(null, null);
      }
      return done(null, exist);
    })
  );

  return passport;
}
