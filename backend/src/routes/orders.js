const router = require('express').Router();
const controller = require('../controllers/orders');
const { auth } = require('../middleware/auth');

router.get('/', auth, controller.getOrders);
router.get('/:id', auth, controller.getOrderDetails);
router.post('/', auth, controller.createOrder);

module.exports = router;
