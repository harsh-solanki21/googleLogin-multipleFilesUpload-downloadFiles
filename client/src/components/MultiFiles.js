import React, { useState, useEffect } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'
import FilesUpload from './FilesUpload'
import docImg from '../assets/doc.webp'

const MultiFiles = () => {
  const [multipleFiles, setMultipleFiles] = useState([])

  const getMultipleFilesList = async () => {
    try {
      const fileslist = await axios.get('http://localhost:5000/getAllFiles')
      setMultipleFiles(fileslist.data)
    } catch (error) {
      console.log(error)
    }
  }

  const downloadFile = async (url, fileName) => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      })
      fileDownload(response.data, fileName)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMultipleFilesList()
  }, [])

  return (
    <>
      <div>
        <FilesUpload getMultiple={() => getMultipleFilesList()} />
      </div>
      <div className='container'>
        {multipleFiles.map((element, index) => (
          <div key={element._id}>
            <div>
              <div key={index}>
                {element.files.map((file, index) => (
                  <div
                    key={index}
                    className='doc'
                    onClick={() =>
                      downloadFile(
                        `http://localhost:5000/${file.filePath}`,
                        file.fileName
                      )
                    }
                  >
                    <img src={docImg} height='80' alt='img' />
                    <br />
                    <span style={{ fontSize: '0.8rem' }}>{file.fileName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MultiFiles
