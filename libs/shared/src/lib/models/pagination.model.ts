export interface PaginationInfo {
  page: number;
  pages: number;
  size: number;
  total: number;
}

export type PaginationParams = Pick<PaginationInfo, 'page'>;
