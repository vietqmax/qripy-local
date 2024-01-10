require('dotenv').config()

const env = process.env.NODE_ENV
const { nanoid } = require('nanoid')
const sharp = require('sharp')
const fs = require('fs')
const util = require('util')

const unlinkFile = util.promisify(fs.unlink)
const config = require('../config/config')[env]

async function uploader(file, folder) {
  if (!file) {
    return 'Please choose files'
  }

  if (!fs.existsSync(`src/public/uploads/${folder}`)) {
    fs.mkdirSync(`src/public/uploads/${folder}`, { recursive: true })
  }

  let filename = nanoid()
  let currentFile = `src/public/uploads/${file.filename}`
  let newFile = `src/public/uploads/${folder}/${filename}.webp`

  await sharp(currentFile)
    .toFile(newFile)
    .then(() => {
      unlinkFile(currentFile)
    })

  return `${folder}/${filename}.webp`
}

async function viewImage(path) {
  if (!path) {
    return `${config.appUrl}/client/img/book/bookclubgroup_default.svg`
  }

  if (!fs.existsSync(`src/public/uploads/${path}`)) {
    return `${config.appUrl}/client/img/book/bookclubgroup_default.svg`
  }
  return `${config.appUrl}/uploads/${path}`
}

module.exports = {
  uploader,
  viewImage,
}
