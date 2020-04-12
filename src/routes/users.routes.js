const { Router } = require('express');
const router = Router();
const { renderSingUpForm, renderSingInForm, signUp, signIn, logout } = require('../controllers/users.controller');

router.get('/users/signup', renderSingUpForm);

router.post('/users/signup', signUp);

router.get('/users/signin', renderSingInForm);

router.post('/users/signin', signIn);

router.get('/users/logout', logout);

module.exports = router;
