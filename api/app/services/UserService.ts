import { default as UserRepository } from '../repositories/UserRepository'
import { IUserService } from './interfaces/IUserService'
import { IUserModel } from '../models/interfaces/IUserModel'

export default class UserService implements IUserService {
  private _userRepository: UserRepository

  constructor() {
    this._userRepository = new UserRepository()
  }

  create(item: IUserModel, callback: (error: any, result: any) => void) {
    console.log('we are creating a new user')
    this._userRepository.create(item, callback)
  }

  retrieve(googleID: string, callback: (error: any, result: any) => void) {
    this._userRepository.retrieve(googleID, callback)
  }

  update(
    _id: string,
    item: IUserModel,
    callback: (error: any, result: any) => void
  ) {
    //TODO: look into this
  }

  addNewBookProgress(
    googleID: string,
    _idBookProgress: string,
    callback: (result: any) => void
  ) {
    this._userRepository.addNewBookProgress(googleID, _idBookProgress, callback)
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.delete(_id, callback)
  }

  findById(_id: string, callback: (error: any, result: IUserModel) => void) {
    this._userRepository.findById(_id, callback)
  }
}
