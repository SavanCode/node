const { open } = require('fs').promises
const { lookup } = require('mime-types')//file type

const { STATIC_EXTENSIONS } = require('../config/constants')

const SAFE_FILE_PATTERN = /^\/?[a-zA-Z0-9_-]+\.[a-z]+$/;

const serveStaticFile = async ({ file, extension, statusCode }, response) => {
  if (STATIC_EXTENSIONS.indexOf(extension) === -1) throw new Error('not_found')
  if (!SAFE_FILE_PATTERN.test(file)) throw new Error('not_found')

  let fileHandle

  try {
    fileHandle = await open(`./public/${file}`, 'r')
    const staticFile = await fileHandle.readFile()

    const mime = lookup(extension)
    if (!mime) throw new Error('not_found')

    response.writeHead(statusCode || 200, {
      'Content-Type': mime
    })

    return response.end(staticFile)
  } catch (error) {
    console.error(error)
    throw new Error('not_found')
  } finally {
    if (fileHandle) fileHandle.close()
  }
}

module.exports = serveStaticFile