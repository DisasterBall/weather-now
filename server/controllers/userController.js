const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models.js')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, email, password, role} = req.body
        if (!email || !password || !username) {
            return next(ApiError.badRequest(req.t('incorrect_email_or_password_or_username')))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(req.t('user_with_this_email_already_exists')))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal(req.t('user_is_not_found')))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal(req.t('wrong_password_specified')))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async update(req, res, next) {
        try {
            
            const updatedUser = await User.update({ 
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
            }, {where:{id: req.body.id},
            returning: true,
            plain: true})
            return res.status(200).send('All Right!')
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            await User.destroy({where: {id: req.body.id}})
            return res.status(200).send('All Right!')
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res) {
        try{
            const {id} = req.body
            const user = await User.findByPk(id)
            res.json(user)
        }catch(e){
            next(ApiError.internal(e.message))
        }
        
    }
}

module.exports = new UserController()