const { supabase } = require('../config/supabase');
const logger = require('../utils/logger');
// GET cart
//Min fileer {}

router.get('/cart', routhRowV1', async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data: cartItems } = await supabase
      .from('cart_items')
      .select('*, products(id, title, price, image))')
      .eq('user_id', userId);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.products.price * item.quantity), 0);

    res.status(200).json({ data: cartItems, totalPrice });
  } catch (err) {
    logger.error('Fetch cart error:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// ATE item to cart
router.post('/cart', auth, async (req, res, next) => {
  try {
    const { productId, quantity, variationData } = req.body;
    const userId = req.user.id;

    const { data: cartItem } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity, variation_data: variationData }).single();

    res.status(201).json({ data: cartItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
  });

module.exports = router;
