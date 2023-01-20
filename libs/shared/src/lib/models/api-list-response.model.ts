export interface ApiListResponse<DataType> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: DataType[];
}
