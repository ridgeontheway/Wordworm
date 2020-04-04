import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaHome } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import LibraryCardComponent from '../../components/card/library'
import UploadCardComponent from '../../components/card/upload'
import LogoutButton from '../../components/button/logout'
import { TOP_ICON } from '../../constants/iconSize'

import '../styles.css'

export default class Screen extends Component {
  componentDidMount() {
    document.title = this.props.documentTitle
  }
  render() {
    return (
      <div className="screen__container">
        <div className="title__container">
          <div className="icon__container">
            <div>
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: TOP_ICON
                }}>
                <div>
                  <FaHome />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="library-card__container">
            <LibraryCardComponent
              text={this.props.libraryText}
              onPress={this.props.handleLibrary}
            />
          </div>
          <div className="library-card__container">
            <UploadCardComponent
              text={this.props.uploadText}
              onPress={this.props.handleSaveBook}
            />
          </div>
          <div className="button__container">
            <LogoutButton />
          </div>
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  libraryText: PropTypes.string.isRequired,
  uploadText: PropTypes.string.isRequired,
  documentTitle: PropTypes.string.isRequired,
  handleSaveBook: PropTypes.func.isRequired,
  handleLibrary: PropTypes.func.isRequired
}
