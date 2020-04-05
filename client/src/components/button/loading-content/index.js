import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import './styles.css'
import '../styles.css'
import '../../styles.css'

export default class LoadingContentButton extends Component {
  render() {
    return (
      <Button
        type="submit"
        className="info-button-loading__theme"
        block
        disabled>
        <div className="loading-content__wrap">
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <p className="text__body loading__padding">loading...</p>
        </div>
      </Button>
    )
  }
}
