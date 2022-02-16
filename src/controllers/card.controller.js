import { HttpStatusCode } from '*/untilities/constants'
import { CardSevice } from '*/services/card.service'

const createNew = async (req, res) => {
    try {
        const result = await CardSevice.createNew(req.body) 
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) { 
        console.log(error)
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await CardSevice.update(id, req.body) 
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) { 
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

export const CardController = { createNew, update }
