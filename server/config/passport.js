const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sql = require('mssql');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
      const user = result.recordset[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await sql.query`SELECT * FROM Users WHERE id = ${id}`;
    const user = result.recordset[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
