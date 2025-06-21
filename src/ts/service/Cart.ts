import Buyable from "../domain/Buyable";

export default class Cart {
  private _items: Buyable[] = [];

  add(item: Buyable): void {
    this._items.push(item);
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  removeById(id: number): void {
    this._items = this._items.filter((item) => item.id !== id);
  }

  calculateTotalCost(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  calculateDiscountedTotal(discount: number): number {
    if (discount < 0 || discount > 100)
      throw new Error("Скидка должна быть числом от 0 до 100");
    const totalCost = this.calculateTotalCost();
    return totalCost * ((100 - discount) / 100);
  }
}
