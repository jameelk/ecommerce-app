const router = require('express').Router();
const { supabase } = require('../config/supabase');

// GET all banners
router.get('/banners', async (req, res) => {
  try {
    const { data: banners } = await supabase.from('banners').select('*').eq('can_display', true);
    res.json({ data: banners });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

module.exports = router;
