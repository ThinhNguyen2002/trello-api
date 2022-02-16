import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { ColumnModel } from '*/models/column.model'

//Define card colections
const cardColectionName = 'cards'
const cardColectionSchema = Joi.object({
    boardId: Joi.string().required(), // also ObjectId when create new
    columnId: Joi.string().required(), // also ObjectId when create new
    title: Joi.string().required().min(3).max(30).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async data => {
    return await cardColectionSchema.validateAsync(data, {
        abortEarly: false,
    })
}

const createNew = async data => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId),
        }
        const result = await getDB()
            .collection(cardColectionName)
            .insertOne(insertValue)

        const dataInserted = await getDB()
            .collection(cardColectionName)
            .findOne({ _id: result.insertedId })

        await ColumnModel.pushCardOrder(
            dataInserted.boardId.toString(),
            dataInserted._id.toString()
        )

        return dataInserted
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * @param {Array of string card id} ids
 */
const deleteMany = async ids => {
    try {
        const transformIds = ids.map(i => ObjectId(i))
        const result = await getDB()
            .collection(cardColectionName)
            .updateMany(
                { _id: { $in: transformIds } },
                { $set: { _destroy: true } }
            )
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
        }
        if (data.columnId) updateData.columnId = ObjectId(data.columnId)
        if (updateData.boardId)
            updateData.boardId = ObjectId(updateData.boardId)
        
        const result = await getDB()
            .collection(cardColectionName)
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

export const CardModel = { cardColectionName, createNew, deleteMany, update }
