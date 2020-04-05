import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export default class LoadingComponent extends Component {
  render() {
    return (
      <Button variant="primary" disabled>
        Loading...
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    )
  }
}
