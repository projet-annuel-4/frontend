export class SearchFilter {
  field: string;
  operator: number;
  value: string;
  values: [string];


  constructor(field: string, operator: number, value: string, values: [string]) {
    this.field = field;
    this.operator = operator;
    this.value = value;
    this.values = values;
  }
}
