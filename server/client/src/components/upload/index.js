import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import ChooseFileButton from '../../components/button/choose-file'
import './styles.css'
import '../styles.css'

export default class Upload extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: 'null'
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
        <div className="upload-form__wrap">
          <Form
            onSubmit={e => {
              this.handleOnClick(e)
            }}>
            <Form.Group>
              <label htmlFor="fileUpload" className="custom-file-upload">
                <div className="upload-form__container">
                  <ChooseFileButton />
                  <p className="text-medium__body">{this.state.fileSelected}</p>
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
            <Button variant="primary" type="submit" block>
              Sign up
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
