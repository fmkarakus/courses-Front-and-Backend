const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.hello);

// write your routes
router.get('/courses', controllers.listFiles);
router.post('/courses', controllers.postFile);
router.put('/courses/:id', controllers.editFile);
router.delete('/courses/:id', controllers.deleteFile);

module.exports = router;
