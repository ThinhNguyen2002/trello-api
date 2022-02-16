import express from 'express'
import { HttpStatusCode } from '*/untilities/constants'
import { boardRouters } from './board.router'
import { columnRouters } from './column.router'
import { cardRouters } from './card.router'

const router = express.Router()

/*  GET v1/status */
router.get('/status', (req, res) =>
    res.status(HttpStatusCode.OK).json({ status: 'OK!' })
)

/* Board APIs */
router.use('/boards', boardRouters)

/* Column APIs */
router.use('/columns', columnRouters)

/* Card APIs */
router.use('/cards', cardRouters)

export const apiV1 = router
