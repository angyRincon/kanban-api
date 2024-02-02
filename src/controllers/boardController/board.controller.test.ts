import request from 'supertest'
import app from '../../app'
import { connection } from '../../typeorm'
import { rootUri, uris } from '../../config/uris'
import boardMock from './board.controller.mock.json'

beforeAll(async () => await connection.initialize())
afterAll(async () => await connection.destroy())

describe("BOARD TESTS", () => {
    let boardId: number
    const { getBoardUri, createBoardUri, updateBoardUri, deleteBoardUri } = uris.board

    it('Should GET all existing Boards', async () => {
        const response = await request(app).get(rootUri + getBoardUri)
        expect(response.statusCode).toBe(200)
    })

    it('Should CREATE a Board', async () => {
        const response = await request(app)
            .post(rootUri + createBoardUri)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(boardMock)

        const { id } = response.body
        expect(response.status).toBe(200)
        expect(id).toBeTruthy()
        boardId = id
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
                "columns": ["column test updated"]
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