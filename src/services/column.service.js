import { ColumnModel } from '*/models/column.model'
import { CardModel } from '*/models/card.model'

const createNew = async data => {
    try {
        //Update columnOrder Array in board collection
        const newColumn = await ColumnModel.createNew(data)
        newColumn.cards = []

        return newColumn
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() }

        if (updateData._id) delete updateData._id
        if (updateData.cards) delete updateData.cards

        const result = await ColumnModel.update(id, updateData)

        if(updateData._destroy){
            CardModel.deleteMany(updateData.cardOrder)
        }

        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnSevice = { createNew, update }
