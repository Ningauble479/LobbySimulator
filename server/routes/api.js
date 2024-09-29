const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/menu/:game', async (req, res) => {
  try {
    const { game } = req.params;
    const result = await sql.query`SELECT * FROM MenuItems WHERE game = ${game}`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to save user settings
router.post('/settings', async (req, res) => {
  try {
    const { userId, game, settings } = req.body;
    await sql.query`
      INSERT INTO UserSettings (userId, game, settings)
      VALUES (${userId}, ${game}, ${JSON.stringify(settings)})
      ON DUPLICATE KEY UPDATE settings = ${JSON.stringify(settings)}
    `;
    res.json({ message: 'Settings saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to retrieve user settings
router.get('/settings/:userId/:game', async (req, res) => {
  try {
    const { userId, game } = req.params;
    const result = await sql.query`
      SELECT settings FROM UserSettings
      WHERE userId = ${userId} AND game = ${game}
    `;
    if (result.recordset.length > 0) {
      res.json(JSON.parse(result.recordset[0].settings));
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
