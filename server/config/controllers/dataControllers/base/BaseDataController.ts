import { BaseDataService } from "../../../../app/services/interfaces/base/BaseDataService";
import mongoose from "mongoose";
export default interface BaseDataController<T extends BaseDataService<any>> {}
