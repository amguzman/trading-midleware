
const { Router } = require('express');

const { ordersGet,
        newOrdersGet,
        ordersPost,
        ordersDelete,
      } = require('../controllers/orders');

const router = Router();


router.get('/', ordersGet);
router.get('/new', newOrdersGet);

router.post('/', ordersPost);

router.delete('/', ordersDelete);

//
// router.put('/:id', ordersPut);
// router.delete('/', usuariosDelete );
//
// router.patch('/', usuariosPatch );


module.exports = router;