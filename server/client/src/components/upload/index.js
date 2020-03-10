import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { IconContext } from 'react-icons'
import { FaCloud } from 'react-icons/fa'
import ChooseFileButton from '../button/choose-file'
import PropTypes from 'prop-types'
import './styles.css'
import '../styles.css'

export default class Upload extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null
    }
  }
  async handleOnClick(event) {
    event.preventDefault()
    const formData = new FormData()

    if (this.state.selectedFile) {
      formData.append(
        'book',
        this.state.selectedFile,
        this.state.selectedFile.name
      )
      this.props.onSubmit(formData)
    } else {
      alert('Please select a file before uploading :)')
    }
  }
  onChange(event) {
    const files = event.target.files
    this.setState(
      {
        selectedFile: files[0]
      },
      () => {
        console.log(
          'I have now saved the file to state:',
          this.state.selectedFile
        )
      }
    )
  }
  render() {
    return (
      <div className="upload__wrap">
        <div>
          <h2 className="title__theme">save a book</h2>
        </div>
        <div>
          <p className="text__theme">store your new book in the cloud</p>
        </div>
        <Form
          onSubmit={e => {
            this.handleOnClick(e)
          }}>
          <div className="upload-form__wrap">
            <Form.Group>
              <label htmlFor="fileUpload" className="custom-file-upload">
                <div className="upload-form__container">
                  <div className="fileUploadIcon__container ">
                    <IconContext.Provider
                      value={{
                        color: 'white',
                        size: 30
                      }}>
                      <div>
                        <FaCloud />
                      </div>
                    </IconContext.Provider>
                  </div>
                  <div>
                    <p>click here to select a book from your computer</p>
                  </div>
                  <div>
                    {this.state.selectedFile ? (
                      <p className="fileChosenText__theme">
                        file selected: {this.state.selectedFile.name}
                      </p>
                    ) : null}
                  </div>
                </div>
              </label>
              <Form.Control
                id="fileUpload"
                name="file"
                type="file"
                accept=".epub"
                label="upload"
                className="form-control-file"
                onChange={e => this.onChange(e)}
              />
            </Form.Group>
            <div className="upload-button__theme">
              <ChooseFileButton />
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

Upload.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
