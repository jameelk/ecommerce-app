const router = require('express').Router();
const { supabase } = require('../config/supabase');

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const { data: categories } = await supabase.from('categories').select('*').eq('can_display', true);
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
