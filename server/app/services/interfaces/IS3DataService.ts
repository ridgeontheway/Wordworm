import { BaseObjectRetrievalService } from "./base/BaseObjectRetrievalService";
import { Instance } from "multer";

export interface IS3DataService extends BaseObjectRetrievalService {
  // Gets the multer instance used to configure interaction with S3
  getUpload(): Instance;
}
