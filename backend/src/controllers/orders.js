const { supabase } = require('../config/supabase');
const logger = require('../utils/logger');
const router = require('express').Router();
const { auth } = require('../middleware/auth');

// GET orders for user
router.get('/orders', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: orders } = await supabase.from('orders').select('*').eq('user_id', userId);

    return res.json({ data: orders });
  } catch (err) {
    logger.error('Fetch orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET order details
router.get('/orders/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data: order } = await supabase
      .from('orders')
      .select('*, order_items(*,'
      )
      .eq('id', id)
      .single();

    if (!order) return res.status(404).json({ error: 'Order not found' });

    return res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// CRATE order
router.post('/orders', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems, shippindAddress, shippingMethod } = req.body;

    const { data: order } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        status: 'pending',
        shipping_address: shippingAddress,
        shipping_method: shippingMethod
      })
      .select();

    // Add items to order
    const order_items = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    await supabase.from('order_items').insert(order_items);

    res.status(201).json({ data: order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
  });

module.exports = router;
