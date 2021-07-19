const {Router} = require('express');
const getSymbols = require('../controllers/getSymbols')
const getRates = require('../controllers/getRates');

const router = Router();

router.get('/symbols',getSymbols);

router.get('/rates/:currencyCode/:amount',getRates)

module.exports = router;
