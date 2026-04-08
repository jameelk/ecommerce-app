const router = require('express').Router();
const controller = require('../controllers/products');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductDetails);

module.exports = router;
