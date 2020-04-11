const { Router } = require('express');
const router = Router();
const { renderSingUpForm, renderSingInForm, singUp, singIn, logout } = require('../controllers/users.controller');

router.get('/users/singup', renderSingUpForm);

router.post('/users/singup', singUp);

router.get('/users/singin', renderSingInForm);

router.post('/users/singin', singIn);

router.get('/users/logout', logout);

module.exports = router;
