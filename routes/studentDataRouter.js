const router = require('express').Router();
const CheckRole = require('../middlewares/role');
const Authenticate = require('../middlewares/authentication');
const Validator = require('../middlewares/validator');
const { getStudentData, getStudentDataById, createStudentData, updateStudentData, deleteStudentData } = require('../controllers/studentDataController');
const { onlyAdminAndStudent } = require('../utils/joiValidation');
const uploadDocument = require('../controllers/uploadDriveControllers');
const upload = require('../middlewares/upload');

router.get('/', getStudentData);
router.get('/:id', getStudentDataById);
router.post('/create', Authenticate, upload, createStudentData);
router.patch('/update/:id', updateStudentData);
router.delete('/delete/:id', deleteStudentData);

module.exports = router;
