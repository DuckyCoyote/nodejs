import swaggerDoc from 'swagger-jsdoc';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wikicid API Documentation',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, './routes/*.ts')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
