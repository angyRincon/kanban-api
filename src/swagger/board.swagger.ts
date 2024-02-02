import { uris } from "../config/uris"

const { getBoardUri } = uris.board

export const swaggerBoardSchema = {
    Board: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'The auto-generated id of the board',
            },
            name: {
                type: 'string',
                description: 'The board name'
            },
            createdAt: {
                type: 'string',
                format: 'date',
                description: 'The date of the Board was created'
            },
            updatedAt: {
                type: 'string',
                format: 'date',
                description: 'The date of the Board was updated'
            },
            deletedAt: {
                type: 'string',
                format: 'date',
                description: 'The date of the Board was deleted'
            },
        },
        example: {
            id: 0,
            name: 'New Board',
            createdAt: '2020-03-10T04:05:06.157Z',
            updatedAt: '2020-03-10T04:05:06.157Z',
            deletedAt: null
        }
    },
    BoardInput: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'The board name'
            },
            columns: {
                type: 'array',
                description: 'The columns list that will be added in the board'
            }
        },
        example: {
            name: 'My new Board',
            columns: ['Column 1', 'Column 2']
        }
    },
}

export const boardSwaggerPath = {
    [getBoardUri]: {
        get: {
            tags: ['Board'],
            summary: "Gets a list of Boards",
            responses: {
                200: {
                    description: 'A list of Boards',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/Board'
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Server Error',
                    content: {
                        'text/plain': {
                            schema: {
                                type: 'string',
                                example: 'Something went wrong'
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Board'],
            summary: "Adds a new Board",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/BoardInput'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Creates a new Board',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/Board'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/board/{id}': {
        put: {
            tags: ['Board'],
            summary: 'Updates an existing Board',
            parameters: [{
                in: 'path',
                name: 'id',
                schema: {
                    required: true,
                    type: 'string',
                    description: 'The Board id that will be updated'

                }
            }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/BoardInput'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Updates an existing Board',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/Board'
                                }
                            }
                        }
                    }
                },
            }
        },
        delete: {
            tags: ['Board'],
            summary: 'Deletes a Board',
            parameters: [{
                in: 'path',
                name: 'id',
                schema: {
                    required: true,
                    type: 'string',
                    description: 'The Board id that will be deleted'
                }
            }],
            responses: {
                200: {
                    description: 'Deletes a Board',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/Board'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}