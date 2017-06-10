let express = require('express');
let router = express.Router();
let path = require('path');
router.get('/get/json', (req, res) => {
    res.json({
        title: '你好，请求成功了!'
    });
});

router.post('/post/json', (req, res) => {
    let data = req.body;
    console.log(data);
    if (data.title) {
        res.json({
            msg: '保存成功'
        });
    } else {
        res.json({
            msg: '保存失败'
        });
    }
});

router.get('/get/file', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../..', './img/cur.png'));
});


module.exports = router;