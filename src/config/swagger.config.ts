import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string',
              description: "The user's first name",
            },
            lastname: {
              type: 'string',
              description: "The user's last name",
            },
            email: {
              type: 'string',
              description: "The user's email",
            },
            password: {
              type: 'string',
              description: "The user's password",
            },
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string',
              description: "The new user's first name",
            },
            lastname: {
              type: 'string',
              description: "The new user's last name",
            },
            email: {
              type: 'string',
              description: "The new user's email",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
