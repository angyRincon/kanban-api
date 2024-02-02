import { boardSwaggerPath, swaggerBoardSchema } from "./board.swagger";
import { swaggerConfig } from "./swaggerConfig";

export const swaggerOptions = {
    ...swaggerConfig,
    definition: {
        ...swaggerConfig.definition,
        paths: {
            ...boardSwaggerPath
        },
        components: {
            schemas: {
                ...swaggerBoardSchema
            }
        },

    }
}