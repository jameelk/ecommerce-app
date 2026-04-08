const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { supabase } = require('../config/supabase');

// GET reviews for product
router.get('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { data: reviews } = await supabase.from('reviews').select('*').eq('product_id', productId).eq('is_approved', true);
    res.json({ data: reviews });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST review
router.post('/', auth, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;
    
    const { data: review } = await supabase.from('reviews').insert({
      product_id: productId,
      user_id: userId,
      rating,
      comment,
      is_approved: false
  
  }).select();

    res.status(201).json({ data: review });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

module.exports = router;
