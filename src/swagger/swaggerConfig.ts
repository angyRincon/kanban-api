import { envConfig } from "../config/environment"

export const swaggerConfig = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Kanban API",
            version: "0.1.0",
            description: "API documentation for Kanban App",
        },
        servers: [
            {
                url: envConfig.apiUrl,
            },
        ],
    },
    basePath: '/api',
    apis: ["src/router/*.ts"],
}