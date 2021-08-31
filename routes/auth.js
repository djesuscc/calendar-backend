/* 
  User routes / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middlewares/validate-fields');
const { 
  createUser, 
  userLogin, 
  renewToken 
} = require('../controllers/auth');

router.post(
  '/', 
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
  ], 
  userLogin
);
router.post(
  '/register', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().normalizeEmail(),
    check('password', 'Password should have 6 characters').isLength({min: 6}),
    validateFields
  ], 
  createUser
);

router.get('/renew', renewToken);



module.exports = router;