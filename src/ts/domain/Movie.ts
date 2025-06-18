import Buyable from "./Buyable";

export default class Movie implements Buyable {
  constructor(
    readonly id: number,
    readonly price: number,
    readonly name: string,
    readonly year: number,
    readonly country: string,
    readonly slogan: string,
    readonly genre: string,
    readonly time: string
  ) {}
}
