import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FeelWatch API",
      version: "1.0.0",
    },
    components: {
      securityDefinitions: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            'JWT Authorization header. Example: "Authorization: {token}"',
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },
  apis: ["controllers/**/*.js"],
};

const specification = swaggerJsdoc(options);

export default [swaggerUi.serve, swaggerUi.setup(specification)];
