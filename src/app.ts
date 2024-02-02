import 'reflect-metadata'
import express from 'express'
import routes from './router'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import ErrorHandler from './middlewares/ErrorHandler';
import { rootUri } from './config/uris';
import { swaggerOptions } from './swagger';
import 'dotenv/config'

const app = express()
const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json())
app.use(rootUri, routes)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true, customSiteTitle: "Kanban API", }));
app.use(ErrorHandler)

export default app