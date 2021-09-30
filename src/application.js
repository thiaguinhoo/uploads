const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');

const multerConfig = require('./config/multer');

const application = express();
const upload = multer(multerConfig);

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(compression());
application.use(helmet());
application.use(cors());
if (process.env.NODE_ENV == 'development') {
    const morgan = require('morgan')
    application.use(morgan('tiny'));
}

application.post('/upload', upload.single('file'), async (request, response) => {
    console.log('file', request.file);
    if (!!request.file) {
        return response.json({ filename: request.file.filename });
    }
    response.json({ error: true });
});

module.exports = application;
