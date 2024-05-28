import House from '../models/House'
import User from '../models/User'
import *as Yup from 'yup'

class HouseController {
    async index(req, res) {
        const { status } = req.query
        const houses = await House.find({ status })
        return res.json(houses)
    }

    async store(req, res) {
        const schema = yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        })
        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação.'})
        }
        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })
        return res.json(house)
    }
}

export default new HouseController()