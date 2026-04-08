const router = require('express').Router();
const { auth, isAdmin } = require('../middleware/auth');
const { supabase } = require('../config/supabase');

router.use(auth, isAdmin);

router.get('/users', async (req, res) => {
  try {
    const { data: users } = await supabase.from('users').select('*');
    return res.json({ data: users });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
  });

router.post('/products', async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const { data: product } = await supabase.from('products').insert({
      title,
      description,
      price,
      category, 
      is_active: true
    }).select();
    return res.status(201).json({ data: product });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

module.exports = router;
