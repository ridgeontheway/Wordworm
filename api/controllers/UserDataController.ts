import UserService from '../app/services/UserService'
import { IUserModel } from '../app/models/interfaces/IUserModel'
import BaseDataController from './base/BaseDataController'

class UserController implements BaseDataController<UserService> {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  create(googleID: string, callback: (error: any, result: any) => void) {
    try {
      var userModel: IUserModel = <IUserModel>(<unknown>{ googleID: googleID })
      console.log('this is the new userModel = ', userModel)
      this.userService.create(userModel, callback)
    } catch (e) {
      console.error('there was an issue with the request:', e)
    }
  }

  // given a user's googleID, we add a read/reading book
  update(
    googleID: string,
    _idBookProgress: string,
    callback: (result: any) => void
  ) {
    try {
      this.userService.addNewBookProgress(googleID, _idBookProgress, callback)
    } catch (e) {
      console.error('there was an issue with the request:', e)
    }
  }

  // Retrieves a based on his/her unique googleID (given to us through the OAUTH flow)
  retrieve(googleID: string, callback: (error: any, result: any) => void) {
    try {
      this.userService.retrieve(googleID, callback)
    } catch (e) {
      console.error('there was an issue with the request:', e)
    }
  }

  delete() {}

  // Finds a document by it's unique ID assigned my mongoDB
  findById(_id: string, callback: (error: any, result: any) => void) {
    try {
      this.userService.findById(_id, callback)
    } catch (e) {
      console.error('there was an issue with the request:', e)
    }
  }
}

export const controller = new UserController()
