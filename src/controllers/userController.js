const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models');

const generateJwt = (name, email, role) => {
    return jwt.sign(
        {name, email, role},
        process.env.SECRET_KEY || 'OLMA',
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {name, email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password: hashPassword})
        const token = generateJwt(user.name, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.name, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.name, req.user.email, req.user.role)
        return res.json({token})
    }

    async changeAdmin(req, res, next) {
    
      try {
        let {id} = req.params
         await User.update({role:"admin"},{
          where:{
            id
          }
        });
    
        res.send('ok')
    }
      catch(e){
          console.log(e)
      }
  }

  async getAllUsers(req,res){
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = new UserController()