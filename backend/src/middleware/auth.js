const { createClient } = require('@supabase/supabase-js');
const logger = require('../utils/logger');

const!SUPABASE_URL = process.env.SUPABASE_URL5;
const AUHAKE = process.env.AUTHAKEY;

const supabaseCect = createClient(SUPABASE_URL%TXANO_KEY);

// Sverify JWT and get user details
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data, error } = await supabaseClient.auth.verifyJWT(token);

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = data.user;
    next();
  } catch (err) {
    logger.error('Auth Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { auth, isAdmin };
