import request from 'supertest'
import app from '../../app'
import { connection } from '../../typeorm'
import { rootUri, uris } from '../../config/uris'
import { boardInputCreate } from './board.controller.mock'
import { Column } from '../../types/Column'

beforeAll(async () => await connection.initialize())
afterAll(async () => await connection.destroy())

describe("BOARD TESTS", () => {
    let boardId: number
    let column: Column

    const { getBoardsUri, getBoardUri, createBoardUri, updateBoardUri, deleteBoardUri } = uris.board

    it('Should GET all existing Boards', async () => {
        const response = await request(app).get(rootUri + getBoardsUri)
        expect(response.statusCode).toBe(200)
    })

    it('Should CREATE a Board', async () => {
        const response = await request(app)
            .post(rootUri + createBoardUri)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(boardInputCreate)

        const { id } = response.body
        expect(response.status).toBe(200)
        expect(id).toBeTruthy()
        boardId = id
    })

    it('Should GET a Board by ID', async () => {
        const url = `${rootUri}/${getBoardUri}`

        const boardResponse = await request(app)
            .get(url.replace('/:id', `/${boardId}`))

        expect(boardResponse.statusCode).toBe(200)
        expect(boardResponse.body.id).toBeTruthy()

        column = boardResponse.body.columns[0]
    })

    it('Should UPDATE a Board', async () => {
        const url = `${rootUri}/${updateBoardUri}`

        const response = await request(app)
            .put(url.replace('/:id', `/${boardId}`))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                "id": boardId,
                "name": "Board Updated",
                "columns": [
                    {
                        id: column.id,
                        name: "column test updated"
                    },
                    "new column test"
                ]
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe('Board updated')
    })

    it('Should DELETE a Board', async () => {
        const url = `${rootUri}/${deleteBoardUri}`
        const response = await request(app)
            .delete(url.replace('/:id', `/${boardId}`))

        expect(response.statusCode).toBe(200)
    })
});