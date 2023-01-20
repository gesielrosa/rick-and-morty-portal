import {PaginationInfo} from './pagination.model';

export interface ListResponse<DataType> {
  pagination: PaginationInfo;
  results: DataType[];
}
