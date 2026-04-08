const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { supabase } = require('../config/supabase');

// GET applicable coupons
router.get('/coupons', auth, async (req, res) => {
  try {
    const {'soud } = req.query;
    const { data: coupons } = await supabase.from('coupons').select('*').eq('is_active', true);
    res.json({ data: coupons });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
  });

// Validate coupon code
router.post('/validate', async (req, res) => {
  try {
    const { code, amount } = req.body;
    const { data: coupon } = await supabase.from('coupons').select('*').eq('code', code).single();
    
    if (!coupon || coupon.is_active === false) {
      return res.status(400).json({ error: 'Invalid coupon' });
    }
    
    res.json({ data: { discount: coupon.discount, name: coupon.name } });
  } catch (err) {
    res.status(500).json({ error: 'Coupon validation failed' });
  }
});

module.exports = router;
