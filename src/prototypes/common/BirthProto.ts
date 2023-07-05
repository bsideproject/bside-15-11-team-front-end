import { DateProto } from "./DateProto";
import { YnTypeProto } from "./type/YnTypeProto";

export interface BirthProto {
  isLunar?: YnTypeProto;
  date?: DateProto;
}