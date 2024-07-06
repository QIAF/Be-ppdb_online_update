const { StudentImage } = require("../models");
const ApiError = require("../utils/apiError");
const handleUploadImage = require("../utils/handleUpload");

const createImage = async (req, res, next) => {
  try {
    files = req.files;
    console.log(files)
    const student_picture = req.files['student_picture'];
    const ijazah_picture = req.files['ijazah_picture'];
    const family_card = req.files['family_card'];
    const graduation_certificate = req.files['graduation_certificate'];
    const graduation_certificate_highSchool = req.files['graduation_certificate_highSchool'];
    const report_scores = req.files['report_scores'];

    console.log(files)
    // Memeriksa ketersediaan file yang diunggah
    if (!student_picture || !ijazah_picture || !family_card || !graduation_certificate || !graduation_certificate_highSchool || !report_scores) {
      return next(new ApiError("All files must be uploaded", 400));
    }
    // Mengunggah setiap file ke ImageKit dan mendapatkan URL dan ID gambar
    const studentPicture = await handleUploadImage(student_picture);
    const ijazahPicture = await handleUploadImage(ijazah_picture);
    const familyCard = await handleUploadImage(family_card);
    const graduationCertificate = await handleUploadImage(
      graduation_certificate
    );
    const graduationCertificateHS = await handleUploadImage(
      graduation_certificate_highSchool
    );
    const reportScores = await handleUploadImage(report_scores);

    // Menyimpan informasi gambar yang diunggah ke basis data
    const newStudentImage = await StudentImage.create({
      student_picture,
      ijazah_picture,
      family_card,
      graduation_certificate,
      graduation_certificate_highSchool,
      report_scores
    });
    res.status(200).json({
      status: "Success",
      message: "Student image successfully created",
      requestAt: req.requesTime,
      data: {
        newStudentImage,
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createImage,
};