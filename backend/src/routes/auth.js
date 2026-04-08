const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { supabase } = require('../config/supabase');

router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const controller = require('../controllers/auth');
    await controller.register(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
  });

router.post('/login', async (req, res) => {
  try {
    const controller = require('../controllers/auth');
    await controller.login(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
  });

router.get('/me', auth, async (req, res) => {
  try {
    const controller = require('../controllers/auth');
    await controller.getUser(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
