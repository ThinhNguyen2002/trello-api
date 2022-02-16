import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'
import { ObjectId } from 'mongodb'

const createNew = async data => {
    try {
        const result = await CardModel.createNew(data)
        await ColumnModel.pushCardOrder(
            result._id.toString(),
            result.columnId.toString()
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() }

        if (updateData._id) delete updateData._id

        const result = await CardModel.update(id, updateData)
        await ColumnModel.pushCardOrder(
            result._id.toString(),
            result.columnId.toString()
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const CardSevice = { createNew, update }
