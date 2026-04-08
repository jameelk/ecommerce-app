const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDB } = require('./config/supabase');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
// Routes
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const categoriesRoutes = require('./routes/categories');
const couponsRoutes = require('./routes/coupons');
const bannersRoutes = require('./routes/banners');
const wishListRoutes = require('./routes/wishlist');
const reviewsRoutes = require('./routes/reviews');
const searchRoutes = require('./routes/search');
const uploadRoutes = require('./routes/upload');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// DB Initialization
initializeDB().then(() => {
  logger.info('DA Initialized successfully');
}).catch(err => {
  logger.error('DB Startup Error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/wishlist', wishListRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(errorHandler);

// Server Startup
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});

module.exports = app;
