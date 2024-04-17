export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public useMethod?: string,
    public desc?: string,
    public qty?: number,
    public start?: Date,
    public end?: Date,
  ) {}
}
