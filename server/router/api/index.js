let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/get/json', (req, res) => {
    res.json({
        title: '你好，请求成功了!'
    });
});


module.exports = router;