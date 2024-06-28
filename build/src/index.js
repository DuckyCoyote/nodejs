"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("../build/routes");
const error_handler_1 = require("./middlewares/error-handler");
const app = (0, express_1.default)();
const options = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:3500',
    preflightContinue: false,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
// app.use(CompanyRouter)
(0, routes_1.RegisterRoutes)(app);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(error_handler_1.errorHandler);
app.listen(4500, () => {
    console.log('Listening on port 4500!');
});
