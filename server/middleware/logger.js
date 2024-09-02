const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const logger = async (req, res, next) => {

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    const logEntry = `${req.ip} - ${req.method}, ${req.originalUrl}\n`;
    const key = `logs/${formattedDate}-requests.log`;

    try {
        let existingLogs = "";
        try {
            const data = await s3.getObject({ 
                Bucket: BUCKET_NAME,
                Key: key
            }).promise();
            existingLogs = data.Body.toString()
            // console.log("logs", existingLogs)
        } catch (err) {
            if (err.code !== "NoSuchKey") {
                console.log(req.method, req.originalUrl)
                return next();
                // throw err
            }
        }
    
        const updatedLogContent = existingLogs + logEntry
    
        await s3.upload({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: updatedLogContent
        }).promise()
    } catch (err) {
        console.log("Failed to upload log entry to S3:", err);
    }


    next();
}

module.exports = logger;