const router = require('express').Router();
const { auth } = require('../middleware/auth');
const controller = require('../controllers/cart');

router.get('/', auth, controller.getCart);
router.post('/', auth, controller.addToCart);
router.put('/:id', auth, controller.updateCartItem);
router.delete('/:id', auth, controller.removeFromCart);

module.exports = router;
