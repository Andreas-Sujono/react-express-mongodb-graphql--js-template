import passport from '../library/auth';

export default function authenticateJWT() {
  const authenticated = passport.authenticate('jwt', { session: false });
  return authenticated;
}
