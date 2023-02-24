export class Ingredient {
  /*
  This is the Traditional way of assigning properties.
  public name: string;
  public amount: number;


  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
  */

  //TypeScript Provide a shortcut for doing the same
  constructor(public name: string, public amount: number) {}
}
