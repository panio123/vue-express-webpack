let express = require('express');
let router = express.Router();
let api = require('./api');
let path = require('path');

router.use('/api', api);

module.exports = router;