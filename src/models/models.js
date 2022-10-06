const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "student"},
})

const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Library = sequelize.define('library', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    desc:{type: DataTypes.STRING},
    video:{type: DataTypes.STRING}
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    desc:{type: DataTypes.STRING},
    img:{type: DataTypes.STRING}
})



Course.hasMany(Video)
Video.belongsTo(Course)

Library.hasMany(Book)
Book.belongsTo(Library)


module.exports = {
   User,
   Course,
   Library,
   Video,
   Book
}
