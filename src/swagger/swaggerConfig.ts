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
                url: "http://localhost:4000/api",
            },
        ],
    },
    basePath: '/api',
    apis: ["src/router/*.ts"],
}