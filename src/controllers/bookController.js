const uuid = require('uuid')
const path = require('path')
const {Book} = require('../models/models')
const ApiError = require('../error/ApiError');

class BookController {
    async create(req, res, next) {
        try {
            let {name, desc, libraryId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const book = await Book.create({name,desc,libraryId, img:fileName});
            return res.json(book)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
  
       const books = await Book.findAll()
        return res.json(books)
    }

    async getOne(req, res) {
  const {id} = req.params
      const book = await Book.findOne({where:{id}})
       return res.json(book)
   }

    async update(req, res) {
      let {id, name,desc} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const books = await Book.update({name,desc, img:fileName}, {
        where: {id}
      })
       return res.json(books)
   }

   async delete(req, res) {
    let {id} = req.query
       await Book.destroy({
      where: {id}
    })
     return res.send("ok")
 }
}

module.exports = new BookController()