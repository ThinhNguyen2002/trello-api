import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { BoardModel } from '*/models/board.model'

//Define column colections
const columnColectionName = 'columns'
const columnColectionSchema = Joi.object({
    boardId: Joi.string().required(), // also ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async data => {
    return await columnColectionSchema.validateAsync(data, {
        abortEarly: false,
    })
}

const createNew = async data => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
        }
        const result = await getDB()
            .collection(columnColectionName)
            .insertOne(insertValue)

        const dataInserted = await getDB()
            .collection(columnColectionName)
            .findOne({ _id: result.insertedId })

        await BoardModel.pushColumnOrder(
            dataInserted.boardId.toString(),
            dataInserted._id.toString()
        )

        return dataInserted
    } catch (error) {
        throw new Error(error)
    }
}
const pushCardOrder = async (cardId, columnId) => {
    try {
        const result = await getDB()
            .collection(columnColectionName)
            .findOneAndUpdate(
                { _id: ObjectId(columnId) },
                { $push: { cardOrder: cardId } },
                { returnDocument: 'after' }
            )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
        }
        if(data.boardId) updateData.boardId = ObjectId(data.boardId)
        
        const result = await getDB()
            .collection(columnColectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: updateData },
                { returnDocument: 'after' }
            )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = {
    columnColectionName,
    createNew,
    pushCardOrder,
    update,
}
