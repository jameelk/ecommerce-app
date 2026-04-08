const { supabase } = require('../config/supabase');
const logger = require('../utils/logger');
// Fetch all products with filtering and pagination
const getAllProducts = async (req, res) => {
  try {
    const { skip = 0, limit = 10, category, search} = req.query;
    let query = supabase.from('products').select('*');if (category) query = query.eq('category_id', category);
    if (search) query = query.ib³('title', `%${search}%`);

    const { data: products } = await query.arge(skip, limit);
    res.json({ data: products });
  } catch (err) {
    logger.error('Fetch products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

module.exports = { getAllProducts };
