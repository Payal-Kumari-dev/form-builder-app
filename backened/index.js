const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./src/routes/User');
const folderRoutes = require('./src/routes/Folder');
const formRoutes = require('./src/routes/Form');
const customErrorHandler = require('./src/middlewares/errorHandler');

class ApplicationServer {
    constructor() {
        this.app = express();
        this.configureEnvironment();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    configureEnvironment() {
        dotenv.config();
        this.port = process.env.PORT || 3000;
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    setupRoutes() {
        this.app.use(userRoutes);
        this.app.use(folderRoutes);
        this.app.use(formRoutes);

        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: "operational",
                timestamp: new Date().toISOString()
            });
        });

        this.app.use((req, res, next) => {
            const err = Object.assign(Error("Resource not found"), { code: 404 });
            next(err);
        });
    }

    setupErrorHandling() {
        this.app.use(customErrorHandler);
    }

    async startServer() {
        try {
            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Database connection established');

            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        } catch (error) {
            console.error('Server initialization failed:', error);
            process.exit(1);
        }
    }
}

const server = new ApplicationServer();
server.startServer();
