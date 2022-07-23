import {SearchFilter} from "./SearchFilter";

export class Filters {
  filters: SearchFilter[];


  constructor(filters: SearchFilter[]) {
    this.filters = filters;
  }
}
