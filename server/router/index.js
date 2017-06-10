let express = require('express');
let path = require('path');
let router = express.Router();
let api = require('./api');

router.use('/api', api);
router.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/view/index.html'));
});
module.exports = router;