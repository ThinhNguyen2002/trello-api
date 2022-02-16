import { cloneDeep } from 'lodash'
import { BoardModel } from '*/models/board.model'
/* 
    Service sẽ xử lý mọi thứ logic trong cv trả về 
    data to client và đẩy về cho controller
    * Push notification
    * Do something...
    * transform data
*/
const createNew = async data => {
    try {
        const result = await BoardModel.createNew(data)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getFullBoard = async boardId => {
    try {
        const board = await BoardModel.getFullBoard(boardId)

        if (!board || !board.columns) {
            throw new Error('Board not found')
        }
        //Handle filter deleted
        const transformBoard = cloneDeep(board)
        transformBoard.columns = transformBoard.columns.filter(c => !c._destroy)

        //Add card to each column
        transformBoard.columns.forEach(column => {
            column.cards = transformBoard.cards.filter(
                c => c.columnId.toString() === column._id.toString()
            )
        })

        //Remove cards
        delete transformBoard.cards

        return transformBoard
    } catch (error) {
        // console.log(error.message)
        throw new Error(error)
    }
}


const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() }

        if (updateData._id) delete updateData._id
        if (updateData.columns) delete updateData.columns

        const result = await BoardModel.update(id, updateData)

        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardSevice = { createNew, getFullBoard, update }
