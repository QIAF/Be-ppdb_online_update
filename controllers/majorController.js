const { Majors } = require("../models");
const ApiError = require("../utils/apiError");
const handleUploadImage = require("../utils/handleUpload");

const getAllMajors = async (req, res, next) => {
  try {
    const allMajors = await Majors.findAll();
    res.status(200).json({
      status: "Success",
      message: "All Majors successfully retrieved",
      requestAt: req.requestTime,
      data: allMajors,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};
const getMajorById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findMajor = await Majors.findOne({
      where: {
        id,
      },
    });
    if (!findMajor) {
      return next(new ApiError(`Major with id '${id} not found`, 404));
    }
    res.status(200).json({
      status: "Success",
      message: `Major with id '${id}' successfully retrieved`,
      requestAt: req.requestTime,
      data: findMajor,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};
const createMajor = async (req, res, next) => {
  try {
    const { major_name, major_description } = req.body;
    const files = req.files;

    if (!files || !files.major_picture) {
      return next(new ApiError("No file uploaded", 422));
    }

    const majorPicture = await handleUploadImage(files.major_picture);
    const data = {
      major_name,
      major_description,
      major_picture: majorPicture.imagesUrl, // Menggunakan URL gambar pertama
    };
    // console.log(data)
    const newMajor = await Majors.create(data);
    console.log("data baru", newMajor)

    // Kirim respon sukses
    res.status(201).json({
      status: "Success",
      message: "Major successfully created",
      data: newMajor,
    });
  } catch (err) {
    // Tangani error jika terjadi
    return next(new ApiError(err.message, 400));
  }
};


// const createMajor = async (req, res, next) => {
//   try {
//     const { major_name, major_description } = req.body;
//     const file = req.file; // Mengambil file tunggal dari req.file

//     if (!file) {
//       return next(new ApiError("No file uploaded", 422));
//     }

//     // Memanggil handleUploadImage dengan file tunggal
//     const { imagesUrl } = await handleUploadImage(file);

//     const data = {
//       major_name,
//       major_description,
//       major_picture: imagesUrl[0], // Mengambil URL gambar pertama
//     };

//     const newMajor = await Majors.create(data);

//     res.status(201).json({
//       status: "Success",
//       message: "Major successfully created",
//       data: newMajor,
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 400));
//   }
// };

// const createMajor = async (req, res, next) => {
//   try {
//     const { major_name, major_description } = req.body;
//     const file = req.file;
  
//     if (!file) {
//       return next(new ApiError("No file uploaded", 422));
//     }
//     const majorPicture = await handleUploadImage(files);
//     console.log(majorPicture)
//     const data = {
//       major_name,
//       major_description,
//       major_picture: majorPicture,
//     };

//     const newMajor = await Majors.create(data);
//     res.status(201).json({
//       status: "Success",
//       message: "Major successfully created",
//       data: newMajor,
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 400));
//   }
// };

// const createMajor = async (req, res, next) => {
//   try {
//     const { major_name, major_description } = req.body;
//     const files = req.files;
//     const images = files.major_picture || [];

//     if (images.length === 0) {
//       return next(new ApiError("No file uploaded", 422));
//     }

//     const { imagesUrl, imagesId } = await handleUploadImage(images);

//     const data = {
//       major_name,
//       major_description,
//       major_picture: imagesUrl[0], // Assuming you want to store only the first image URL
//     };

//     const newMajor = await Majors.create(data);

//     res.status(201).json({
//       status: "Success",
//       message: "Major successfully created",
//       data: newMajor,
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 400));
//   }
// };
const updateMajor = async (req, res, next) => {
  try {
    const { major_name, major_description } = req.body;
    const id = req.params.id;
    const files = req.files;
    const image = files.major_picture;

    if (!image) {
      return next(new ApiError("No file uploaded", 422));
    }

    const findMajor = await Majors.findOne({
      where: {
        id,
      },
    });
    if (!findMajor) {
      return next(new ApiError(`Major with id '${id}' is not found`, 404));
    }
    const majorPicture = await handleUploadImage(image); // upload image

    await Majors.update(
      {
        major_name,
        major_description,
        major_picture: majorPicture.imagesUrl,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Major successfully updated",
      data: {
        major_name: major_name,
        major_description: major_description,
        major_picture: majorPicture.imagesUrl,
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};
const deleteMajor = async (req, res, next) => {
  const id = req.params.id
  try {
    const Major = await Majors.findByPk(id);
    if (!Major) {
      return next(new ApiError(`Major with id '${id}' not found`));
    }
    await Majors.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Major successfully deleted",
      requestAt: req.requestTime,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};
module.exports = {
  getAllMajors,
  createMajor,
  updateMajor,
  getMajorById,
  deleteMajor,
};
