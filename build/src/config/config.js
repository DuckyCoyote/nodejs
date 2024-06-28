"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    env: process.env.NODE_ENV || 'env',
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    DATABASE: process.env.DATABASE_NAME,
    ENVIRONMENT: process.env.ENVIRONMENT
};
exports.default = config;
