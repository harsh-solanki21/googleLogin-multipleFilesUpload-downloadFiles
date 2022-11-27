const express = require('express')
const { upload } = require('../middleware/fileHelper')
const {
  multipleFilesUpload,
  getAllFiles,
} = require('../controllers/filesController')
const router = express.Router()

router.post('/multiplefiles', upload.array('files'), multipleFilesUpload)
router.get('/getAllFiles', getAllFiles)

module.exports = router
