import { IRead } from "../common/IRead";
import { IWrite } from "../common/IWrite";

export interface BaseDataService<T> extends IRead<T>, IWrite<T> {}
