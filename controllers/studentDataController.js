// const { studentData, studentReportScores } = require("../models");
// const ApiError = require("../utils/apiError");
// const { google } = require("googleapis");
// const apiKey = require("../security/apiKey");
// const Readable = require("stream");
// const SCOPE = ["https://www.googleapis.com/auth/drive"];
// // const convertDate = require("../utils/convertDate");
// const authorize = async () => {
//   const jwtClient = new google.auth.JWT(
//     apiKey.client_email,
//     null,
//     apiKey.private_key,
//     SCOPE
//   );
//   return jwtClient;
// };
// const findAllStudentData = async (req, res, next) => {
//   try {
//     const allStudentData = await studentData.findAll();
//     const allReportScore = await studentReportScores.findAll();

//     res.status(200).json({
//       status: "Success",
//       message: "Student data successfully retrieved",
//       requestAt: req.requestTime,
//       data: {
//         allStudentData,
//         allReportScore,
//       },
//     });
//   } catch (err) {
//     return next(new Error(err.message, 400));
//   }
// };
// const findStudentDataById = async (req, res, next) => {
//   try {
//     const user_id = req.user.id;
//     const findData = await studentData.findOne({
//       where: {
//         user_id,
//       },
//     });
//     console.log(findData);

//     if (!findData) {
//       return next(new ApiError(`Student data with id ${id} not found`, 404));
//     }
//     const findReportScore = await studentReportScores.findOne({
//       where: {
//         user_id,
//       },
//     });
//     console.log(findReportScore);

//     if (!findData) {
//       return next(new ApiError(`Student data with id ${id} not found`, 404));
//     }
//     res.status(200).json({
//       status: "Success",
//       message: "Student data successfully retrieved",
//       requestAt: req.requestTime,
//       data: { findData, findReportScore },
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 400));
//   }
// };
// const createStudentData = async (req, res, next) => {
//   const files = req.files;
//   const user_id = req.user.id;
//   const {
//     student_name,
//     family_card_number,
//     student_gender,
//     place_birth,
//     date_birth,
//     student_address,
//     student_address_now,
//     student_distance,
//     student_religion,
//     student_blood_type,
//     student_weight,
//     student_height,
//     student_child,
//     student_kps,
//     student_hobby,
//     father_name,
//     father_job,
//     father_income,
//     place_birth_father,
//     father_birth,
//     mother_name,
//     mother_job,
//     mother_income,
//     place_birth_mother,
//     mother_birth,
//     phoneNumber_house,
//     guardian_name,
//     guardian_address,
//     guardian_phone,
//     guardian_job,
//     school_name,
//     school_address,
//     school_status,
//     ijazah_number,
//     major_choice1,
//     major_choice2,
//     nisn,
//     mathematics1,
//     mathematics2,
//     mathematics3,
//     mathematics4,
//     mathematics5,
//     science1,
//     science2,
//     science3,
//     science4,
//     science5,
//     indonesian1,
//     indonesian2,
//     indonesian3,
//     indonesian4,
//     indonesian5,
//     english1,
//     english2,
//     english3,
//     english4,
//     english5,
//   } = req.body;

//   console.log(req.body);

//   const scores = [
//     mathematics1,
//     mathematics2,
//     mathematics3,
//     mathematics4,
//     mathematics5,
//     science1,
//     science2,
//     science3,
//     science4,
//     science5,
//     indonesian1,
//     indonesian2,
//     indonesian3,
//     indonesian4,
//     indonesian5,
//     english1,
//     english2,
//     english3,
//     english4,
//     english5,
//   ];
//   console.log(scores);
//   // const totalScore = scores.reduce(
//   //   (acc, score) => acc + (Number(score) || 0),
//   //   0
//   // );
//   // console.log("totalnya :", totalScore);
//   // const average_report_score = totalScore / scores.length;
//  const validScores = scores.filter((score) => score !== undefined && score !== null);

//   // Calculate the total of all valid scores
//   const totalScore = validScores.reduce((acc, score) => acc + Number(score), 0);

//   // Calculate the average score
//   const average_report_score = totalScore / validScores.length;
//   try {
//     const existingStudentData = await studentData.findOne({ where: { user_id } });
//     if (existingStudentData) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "You have already created student data. You cannot create more than one entry.",
//       });
//     }
//     const studentDocument = files["studentDocument"];
//     const report_score = await studentReportScores.create({
//       user_id,
//       mathematics1,
//       mathematics2,
//       mathematics3,
//       mathematics4,
//       mathematics5,
//       science1,
//       science2,
//       science3,
//       science4,
//       science5,
//       indonesian1,
//       indonesian2,
//       indonesian3,
//       indonesian4,
//       indonesian5,
//       english1,
//       english2,
//       english3,
//       english4,
//       english5,
//       total_report_score: average_report_score,
//     });

//     let documentId = "";
//     console.log(documentId);
//     const upload = async (authClient) => {
//       const fileBuffer = await Promise.all(
//         studentDocument.map(async (file) => {
//           return file.buffer;
//         })
//       );

//       console.log(studentDocument);

//       const drive = google.drive({
//         version: "v3",
//         auth: authClient,
//       });

//       const file = await new Promise((resolve, reject) => {
//         drive.files.create(
//           {
//             resource: {
//               name: studentDocument[0].originalname || new Date(),
//               parents: [process.env.DRIVE_FOLDER_ID],
//             },
//             media: {
//               body: new Readable.PassThrough().end(fileBuffer[0]),
//               mimeType: "application/pdf",
//             },
//             fields: "id",
//           },
//           (err, file) => {
//             if (err) {
//               return reject(err);
//             }
//             console.log("========== ID FILE =============");
//             console.log(file.data);
//             console.log("========== ID FILE =============");
//             resolve(file.data.id);
//           }
//         );
//       });
//       documentId = file;
//       console.log(file);
//     };

//     await authorize()
//       .then(upload)
//       .catch((err) => console.log(err));

    // const formattedDate_date_birth = convertDate(date_birth);
    // const formattedDate_father_birth = convertDate(father_birth);
    // const formattedDate_mother_birth = convertDate(mother_birth);
//     // console.log(formattedDate_date_birth);
//     const newStudentData = await studentData.create({
//       user_id,
//       student_name,
//       family_card_number,
//       student_gender,
//       place_birth,
//       date_birth,//: formattedDate_date_birth,
//       student_address,
//       student_address_now,
//       student_distance,
//       student_religion,
//       student_blood_type,
//       student_weight,
//       student_height,
//       student_child,
//       student_kps,
//       student_hobby,
//       father_name,
//       father_job,
//       father_income,
//       place_birth_father,
//       father_birth,//: formattedDate_father_birth,
//       mother_name,
//       mother_job,
//       mother_income,
//       place_birth_mother,
//       mother_birth, //: formattedDate_mother_birth,
//       phoneNumber_house,
//       guardian_name,
//       guardian_address,
//       guardian_phone,
//       guardian_job,
//       school_name,
//       school_address,
//       school_status,
//       ijazah_number,
//       major_choice1,
//       major_choice2,
//       nisn,
//       upload_document: documentId,
//     });
//     console.log("Student data masuk ga?", newStudentData);
//     res.status(200).json({
//       status: "Success",
//       message: " Student Data Successfully created",
//       requestAt: req.requestTime,
//       data: {
//         student: {
//           // id: studentData.id,
//           user_id: newStudentData.user_id,
//           student_name: newStudentData.student_name,
//           family_card_number: newStudentData.family_card_number,
//           student_gender: newStudentData.student_gender,
//           place_birth: newStudentData.place_birth,
//           date_birth: newStudentData.date_birth,
//           student_address: newStudentData.student_address,
//           student_address_now: newStudentData.student_address_now,
//           student_distance: newStudentData.student_distance,
//           student_religion: newStudentData.student_religion,
//           student_blood_type: newStudentData.student_blood_type,
//           student_weight: newStudentData.student_weight,
//           student_height: newStudentData.student_height,
//           student_child: newStudentData.student_child,
//           student_kps: newStudentData.student_kps,
//           student_hobby: newStudentData.student_hobby,
//           father_name: newStudentData.father_name,
//           father_job: newStudentData.father_job,
//           father_income: newStudentData.father_income,
//           place_birth_father: newStudentData.place_birth_father,
//           father_birth: newStudentData.father_birth,
//           mother_name: newStudentData.mother_name,
//           mother_job: newStudentData.mother_job,
//           mother_income: newStudentData.mother_income,
//           place_birth_mother: newStudentData.place_birth_mother,
//           mother_birth: newStudentData.mother_birth,
//           phoneNumber_house: newStudentData.phoneNumber_house,
//           guardian_name: newStudentData.guardian_name,
//           guardian_address: newStudentData.guardian_address,
//           guardian_phone: newStudentData.guardian_phone,
//           guardian_job: newStudentData.guardian_job,
//           school_name: newStudentData.school_name,
//           school_address: newStudentData.school_address,
//           ijazah_number: newStudentData.ijazah_number,
//           major_choice1: newStudentData.major_choice1,
//           major_choice: newStudentData.major_choice2,
//           nisn: newStudentData.nisn,
//           upload_document: newStudentData.upload_document,
//         },
//         report_score: {
//           user_id: newStudentData.user_id,
//           mathematics1: report_score.mathematics1,
//           mathematics2: report_score.mathematics2,
//           mathematics3: report_score.mathematics3,
//           mathematics4: report_score.mathematics4,
//           mathematics5: report_score.mathematics5,
//           science1: report_score.science1,
//           science2: report_score.science2,
//           science3: report_score.science3,
//           science4: report_score.science4,
//           science5: report_score.science5,
//           indonesian1: report_score.indonesian1,
//           indonesian2: report_score.indonesian2,
//           indonesian3: report_score.indonesian3,
//           indonesian4: report_score.indonesian3,
//           indonesian5: report_score.indonesian5,
//           english1: report_score.english1,
//           english2: report_score.english2,
//           english3: report_score.english3,
//           english4: report_score.english4,
//           english5: report_score.english5,
//           total_report_score: average_report_score,
//         },
//       },
//     });
//   } catch (err) {
//     console.error("Error in createStudentData:", err);
//     return next(new ApiError(err.message, 400));
//   }
// };
// const updateStudentData = async (req, res, next) => {
//   const user_id = req.params.id;
//   console.log (user_id)
//   const {
//     student_name,
//     family_card_number,
//     student_gender,
//     place_birth,
//     date_birth,
//     student_address,
//     student_address_now,
//     student_distance,
//     student_religion,
//     student_blood_type,
//     student_weight,
//     student_height,
//     student_child,
//     student_kps,
//     student_hobby,
//     father_name,
//     father_job,
//     father_income,
//     place_birth_father,
//     father_birth,
//     mother_name,
//     mother_job,
//     mother_income,
//     place_birth_mother,
//     mother_birth,
//     phoneNumber_house,
//     guardian_name,
//     guardian_address,
//     guardian_phone,
//     guardian_job,
//     school_name,
//     school_address,
//     school_status,
//     ijazah_number,
//     major_choice1,
//     major_choice2,
//     nisn,
//     mathematics1,
//     mathematics2,
//     mathematics3,
//     mathematics4,
//     mathematics5,
//     science1,
//     science2,
//     science3,
//     science4,
//     science5,
//     indonesian1,
//     indonesian2,
//     indonesian3,
//     indonesian4,
//     indonesian5,
//     english1,
//     english2,
//     english3,
//     english4,
//     english5,
//   } = req.body;

//   try {
//     const findStudentData = await studentData.findOne({
//       where: {
//         user_id,
//       },
//     });
//     if (!findStudentData) {
//       return next(new ApiError(`Data with id '${id}' not found`, 404));
//     }
//     const findReportScore = await studentReportScores.findOne({
//       where: {
//         user_id,
//       },
//     });
//     if (!findReportScore) {
//       return next(new ApiError(`Data with id '${id}' not found`, 404));
//     }
//     const scores = [
//       mathematics1,
//       mathematics2,
//       mathematics3,
//       mathematics4,
//       mathematics5,
//       science1,
//       science2,
//       science3,
//       science4,
//       science5,
//       indonesian1,
//       indonesian2,
//       indonesian3,
//       indonesian4,
//       indonesian5,
//       english1,
//       english2,
//       english3,
//       english4,
//       english5,
//     ];
//     // const totalScore = scores.reduce((acc, scores) => acc + scores, 0);
//     // const totalScore =
//     //   mathematics1 +
//     //   mathematics2 +
//     //   mathematics3 +
//     //   mathematics4 +
//     //   mathematics5 +
//     //   science1 +
//     //   science2 +
//     //   science3 +
//     //   science4 +
//     //   science5 +
//     //   indonesian1 +
//     //   indonesian2 +
//     //   indonesian3 +
//     //   indonesian4 +
//     //   indonesian5 +
//     //   english1 +
//     //   english2 +
//     //   english3 +
//     //   english4 +
//     //   english5;

//     // const average_report_score = totalScore / scores.length;
//     console.log(scores);
//     const totalScore = scores.reduce(
//       (acc, score) => acc + (Number(score) || 0),
//       0
//     );
//     console.log("totalnya :", totalScore);
//     const average_report_score = totalScore / scores.length;
//     console.log(average_report_score);

//     await studentReportScores.update(
//       {
      
//         mathematics1,
//         mathematics2,
//         mathematics3,
//         mathematics4,
//         mathematics5,
//         science1,
//         science2,
//         science3,
//         science4,
//         science5,
//         indonesian1,
//         indonesian2,
//         indonesian3,
//         indonesian4,
//         indonesian5,
//         english1,
//         english2,
//         english3,
//         english4,
//         english5,
//         total_report_score: average_report_score,
//       },
//       {
//         where: {
//           user_id,
//         },
//       }
//     );
//     await studentData.update(
//       {
     
//         student_name,
//         family_card_number,
//         student_gender,
//         place_birth,
//         date_birth,
//         student_address,
//         student_address_now,
//         student_distance,
//         student_religion,
//         student_blood_type,
//         student_weight,
//         student_height,
//         student_child,
//         student_kps,
//         student_hobby,
//         father_name,
//         father_job,
//         father_income,
//         place_birth_father,
//         father_birth,
//         mother_name,
//         mother_job,
//         mother_income,
//         place_birth_mother,
//         mother_birth,
//         phoneNumber_house,
//         guardian_name,
//         guardian_address,
//         guardian_phone,
//         guardian_job,
//         school_name,
//         school_address,
//         school_status,
//         ijazah_number,
//         major_choice1,
//         major_choice2,
//         nisn,
//         mathematics1,
//         mathematics2,
//         mathematics3,
//         mathematics4,
//         mathematics5,
//         science1,
//         science2,
//         science3,
//         science4,
//         science5,
//         indonesian1,
//         indonesian2,
//         indonesian3,
//         indonesian4,
//         indonesian5,
//         english1,
//         english2,
//         english3,
//         english4,
//         english5,
//       },
//       {
//         where: {
//           user_id,
//         },
//       }
//     );
//     const updateData = await studentData.findOne({
//       where: {
//        user_id,
//       },
//     });
//     console.log(updateData);
//     const updateReport = await studentReportScores.findOne({
//       where: {
//         user_id,
//       },
//     });
//     console.log(updateReport);
//     res.status(200).json({
//       status: "Success",
//       message: "Student Data successfully updated",
//       requestAt: req.requestTime,
//       data: { updateReport, updateData },
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 400));
//   }
// };
// const deleteStudentData = async (req, res, next) => {
//   try {
//     const user_id = req.params.id;
//     const findData = await studentData.findOne({
//       where: {
//         user_id,
//       },
//     });
//     if (!findData) {
//       return next(new ApiError(`Student data with id ${id} not found`, 400));
//     }
//     const findReportScore = await studentReportScores.findOne({
//       where: {
//         user_id,
//       },
//     });
//     if (!findReportScore) {
//       return next(new ApiError(`Student data with id ${id} not found`, 400));
//     }
//     await findData.destroy({
//       where: {
//         user_id,
//       },
//     });
//     await findReportScore.destroy({
//       where: {
//         user_id,
//       },
//     });
//     res.status(200).json({
//       status: "Success",
//       message: "Student data successfully deleted",
//       requestAt: req.requestTime,
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 400));
//   }
// };
// module.exports = {
//   findAllStudentData,
//   findStudentDataById,
//   createStudentData,
//   updateStudentData,
//   deleteStudentData,
// };
