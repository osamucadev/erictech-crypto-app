import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Erictech Crypto App API",
      version: "1.0.0",
      description: "API for managing users and cryptocurrency data",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
            },
            profileImage: {
              type: "string",
              description: "URL to the user profile image",
            },
            description: {
              type: "string",
              description: "User description or bio",
            },
          },
        },
        UserRegister: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
            },
            password: {
              type: "string",
              format: "password",
              description: "The password of the user",
            },
            description: {
              type: "string",
              description: "User description or bio",
            },
            profileImage: {
              type: "string",
              format: "binary",
              description: "User profile image file",
            },
          },
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
            },
            password: {
              type: "string",
              format: "password",
              description: "The password of the user",
            },
          },
        },
        UserUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
            },
            password: {
              type: "string",
              format: "password",
              description: "The new password of the user",
            },
            description: {
              type: "string",
              description: "User description or bio",
            },
            profileImage: {
              type: "string",
              format: "binary",
              description: "User profile image file",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            token: {
              type: "string",
              description: "JWT token for authentication",
            },
            profileImage: {
              type: "string",
              description: "URL to the user profile image",
            },
          },
        },
        CryptoCoin: {
          type: "object",
          properties: {
            id: { type: "string" },
            symbol: { type: "string" },
            name: { type: "string" },
            current_price: { type: "number" },
            market_cap: { type: "number" },
            market_cap_rank: { type: "number" },
            price_change_percentage_24h: { type: "number" },
            image: { type: "string" },
            last_updated: { type: "string", format: "date-time" },
          },
        },
        CryptoSearchResult: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            symbol: { type: "string" },
            marketCapRank: { type: "number" },
            thumb: { type: "string" },
            large: { type: "string" },
          },
        },
        CryptoDetails: {
          type: "object",
          properties: {
            id: { type: "string" },
            symbol: { type: "string" },
            name: { type: "string" },
            hashing_algorithm: { type: "string" },
            description: { type: "object" },
            market_data: { type: "object" },
            genesis_date: { type: "string" },
            last_updated: { type: "string", format: "date-time" },
          },
        },
        PaginatedCryptoList: {
          type: "object",
          properties: {
            page: { type: "number" },
            per_page: { type: "number" },
            total: { type: "number" },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CryptoCoin",
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
