const router = require('express').Router();
const { supabase } = require('../config/supabase');

// Full-text search using PostgreSQL fuzzy search
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const { data: results } = await supabase
      .from('products')
      .select('*')
      .ilike('title', `%${q}%`)
      .limit(10);
    
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
