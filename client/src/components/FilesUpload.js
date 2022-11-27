import React, { useState } from 'react'
import axios from 'axios'

const FilesUpload = (props) => {
  const [multipleFiles, setMultipleFiles] = useState('')

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files)
  }

  const UploadMultipleFiles = async () => {
    if (multipleFiles.length === 0) {
      throw new Error('No files selected')
    }

    const formData = new FormData()
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('files', multipleFiles[i])
    }
    await axios.post('http://localhost:5000/multiplefiles', formData)
    props.getMultiple()

    setMultipleFiles('')
  }

  return (
    <>
      <div>
        <label>Select Multiple Files</label>
        <input type='file' onChange={(e) => MultipleFileChange(e)} multiple />
      </div>
      <div>
        <button type='button' onClick={() => UploadMultipleFiles()}>
          Upload
        </button>
      </div>
    </>
  )
}

export default FilesUpload
