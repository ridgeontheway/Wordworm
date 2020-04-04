import React, { Component } from 'react'
import { IconContext } from 'react-icons'
import { FaCloudUploadAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { TOP_ICON } from '../../constants/iconSize'
import Upload from '../../components/upload'
import DashboardButton from '../../components/button/dashboard'
import './styles.css'
import '../styles.css'
export default class Screen extends Component {
  render() {
    return (
      <div className="screen__container upload-content__container">
        <div className="title__container">
          <div className="icon__container">
            <div>
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: TOP_ICON
                }}>
                <div>
                  <FaCloudUploadAlt />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="content__wrapper content-padding">
            <div className="login__container">
              <Upload onSubmit={this.props.handleFormSubmit} />
            </div>
          </div>
          <div className="button__container">
            <DashboardButton onPress={this.props.onDashboardSelected} />
          </div>
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  onDashboardSelected: PropTypes.func.isRequired
}
