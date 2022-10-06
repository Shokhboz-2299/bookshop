const {Library} = require('../models/models')
const ApiError = require('../error/ApiError');

class LibraryController {
    async create(req, res, next) {
        try {
            let {name} = req.body
            const library = await Library.create({name});
            return res.json(library)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
  
       const library = await Library.findAll()
        return res.json(library)
    }

    async updateLibrary(req, res) {
      let {id, name} = req.body
      const library = await Library.update({name}, {
        where: {id}
      })
       return res.json(library)
   }

   async deleteLibrary(req, res) {
    let {id} = req.query
       await Library.destroy({
      where: {id}
    })
     return res.send("ok")
 }
}

module.exports = new LibraryController()