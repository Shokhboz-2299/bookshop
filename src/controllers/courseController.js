const {Course} = require('../models/models')
const ApiError = require('../error/ApiError');

class CourseController {
    async create(req, res, next) {
        try {
            let {name} = req.body
            const course = await Course.create({name});
            return res.json(course)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
  
       const course = await Course.findAll()
        return res.json(course)
    }

    async updateLibrary(req, res) {
      let {id, name} = req.body
      const course = await Course.update({name}, {
        where: {id}
      })
       return res.json(course)
   }

   async deleteLibrary(req, res) {
    let {id} = req.query
       await Course.destroy({
      where: {id}
    })
     return res.send("ok")
 }
}

module.exports = new CourseController()