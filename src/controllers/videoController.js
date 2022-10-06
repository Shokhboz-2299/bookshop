const uuid = require('uuid')
const path = require('path')
const {Video} = require('../models/models')
const ApiError = require('../error/ApiError');

class VideoController {
    async create(req, res, next) {
        try {
            let {name, desc, courseId} = req.body
            const {video} = req.files
            let fileName = uuid.v4() + ".jpg"
            video.mv(path.resolve(__dirname, '..', 'static', fileName))
            const videos = await Video.create({name,desc,courseId, video:fileName});
            return res.json(videos)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
  
       const videos = await Video.findAll()
        return res.json(videos)
    }

    async getOne(req, res) {
  const {id} = req.params
      const video = await Video.findOne({where:{id}})
       return res.json(video)
   }

    async update(req, res) {
      let {id, name,desc} = req.body
      const {video} = req.files
      let fileName = uuid.v4() + ".mp4"
      video.mv(path.resolve(__dirname, '..', 'static', fileName))
      const videos = await Video.update({name,desc, video:fileName}, {
        where: {id}
      })
       return res.json(videos)
   }

   async delete(req, res) {
    let {id} = req.query
       await Video.destroy({
      where: {id}
    })
     return res.send("ok")
 }
}

module.exports = new VideoController()