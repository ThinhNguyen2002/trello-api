import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

//Define board colections
const boardColectionName = 'boards'
const boardColectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async data => {
    return await boardColectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async data => {
    try {
        const value = await validateSchema(data)
        const result = await getDB()
            .collection(boardColectionName)
            .insertOne(value)

        const dataInserted = await getDB()
            .collection(boardColectionName)
            .findOne({ _id: result.insertedId })

        return dataInserted
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
        }
        const result = await getDB()
            .collection(boardColectionName)
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

/**
 * @param {string} boardId
 * @param {string} columnId
 */

const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB()
            .collection(boardColectionName)
            .findOneAndUpdate(
                { _id: ObjectId(boardId) },
                { $push: { columnOrder: columnId } },
                { returnDocument: 'after' }
            )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const getFullBoard = async boardId => {
    try {
        const result = await getDB()
            .collection(boardColectionName)
            .aggregate([
                {
                    $match: {
                        _id: ObjectId(boardId),
                        _destroy: false,
                    },
                },
                // thêm 1 field vào trong quá trình query và ghi đè lên field cũ
                // {
                //     $addFields: {
                //         _id: { $toString : '$_id'}
                //     }
                // },
                {
                    $lookup: {
                        from: ColumnModel.columnColectionName,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns',
                    },
                },
                {
                    $lookup: {
                        from: CardModel.cardColectionName,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'cards',
                    },
                },
            ])
            .toArray()

        return result[0] || {}
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { createNew, pushColumnOrder, getFullBoard, update }
