const { Router } = require ('express');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDel } = require ('../controllers/user.js');
const router = Router ();

router.get('/', usuarioGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/', usuarioDel);

module.exports = router;