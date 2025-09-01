import NegativeAmountException from "./NegativeAmountException";
import NotAllowedCurrencyException from "./NotAllowedCurrencyException";

const allowedCurrencies = ["USD", "EUR"];

export default class Amount {
  constructor(public amount: number, public currency: string) {
    if (amount < 0) throw new NegativeAmountException();
    if (!allowedCurrencies.includes(currency))
      throw new NotAllowedCurrencyException();
  }
}
