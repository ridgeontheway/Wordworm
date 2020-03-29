import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaBookOpen } from 'react-icons/fa'
import { TOP_ICON } from '../../constants/iconSize'
import ReadableContent from '../../components/readable'
import DashboardButton from '../../components/button/dashboard'
import LibraryButton from '../../components/button/library'

import './styles.css'
import '../styles.css'
export default class Screen extends Component {
  // this is where we are actually look up the content
  renderContent() {
    return (
      <div className="readable-content__wrapper">
        {this.props.bookContentLookUp.map((data, idx) => {
          return (
            <ReadableContent
              key={idx}
              lookUp={data}
              content={this.props.bookContent[idx]}
            />
          )
        })}
      </div>
    )
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
                  <FaBookOpen />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="content__wrapper content-padding">
            <div>{this.props.bookContent ? this.renderContent() : null}</div>
          </div>
          <div className="button__container">
            <div className="reading-button__wrapper">
              <div className="reading-button__padding">
                <DashboardButton onPress={this.props.onDashboardSelected} />
              </div>
              <div className="reading-button__padding">
                <LibraryButton onPress={this.props.onLibrarySelected} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  bookContent: PropTypes.array.isRequired,
  bookContentLookUp: PropTypes.array.isRequired,
  onDashboardSelected: PropTypes.func.isRequired,
  onLibrarySelected: PropTypes.func.isRequired
}
