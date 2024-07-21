const { google } = require("googleapis");
const apiKey = require("../security/apiKey");
const ApiError = require("../utils/apiError");
const Readable = require("stream");

const SCOPE = ["https://www.googleapis.com/auth/drive"];

const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    apiKey.client_email,
    null,
    apiKey.private_key,
    SCOPE
  );
  return jwtClient;
};

const uploadDocument = (req, res, next) => {
  try {
    const files = req.files;
    const studentDocument = files["studentDocument"];

    const upload = async (authClient) => {
      const fileBuffer = await Promise.all(
        studentDocument.map(async (file) => {
          return file.buffer;
        })
      );
      return new Promise ((resolve, reject) => {
        const drive = google.drive({
          version: "v3",
          auth: authClient,
        });

        drive.files.create(
          {
            resource: {
              name: studentDocument[0].originalname || new Date(),
              parents: ["18TWnXnlGLoSO5CsQanU9F7iFAfdvS0Dc"],
            },
            media: {
              body: new Readable.PassThrough().end(fileBuffer[0]),
              mimeType: "application/pdf",
            },
            fields: "id",
          },
          (err, file) => {
            if (err) {
              return reject(err);
            }
            resolve(file);
          }
        );
      });
    };

    authorize().then(upload).catch((err) => console.log(err));

    res.status(200).json({
        status: "true",
        message: "your document uploaded successfully"
    })
  } catch (err) {
    return next (new ApiError(err.message, 500))
  }
};

module.exports = uploadDocument;
