const multer = require('multer');

const storage = multer.memoryStorage();

const multerConfig = multer({
	storage: storage,

	limits: {
		fileSize: 2 * 1024 * 1024, // 2MB
	},
});

const upload = multerConfig.fields([
	{ name: 'ijazah_picture', maxCount: 1 },
	{ name: 'student_picture', maxCount: 1 },
	{ name: 'family_card', maxCount: 1 },
	{ name: 'graduation_certificate', maxCount: 1 },
	{ name: 'graduation_certificate_highSchool', maxCount: 1 },
	{ name: 'report_scores', maxCount: 1 },
	{ name: 'major_picture', maxCount: 1 },
	{ name: 'studentDocument', maxCount: 1 },
]);

module.exports = upload;
