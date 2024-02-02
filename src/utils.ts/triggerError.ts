import { NextFunction } from "express"

export const triggerError = (statusCode: number, message: string, next: NextFunction) => {
    return next({
        statusCode,
        message
    })
}