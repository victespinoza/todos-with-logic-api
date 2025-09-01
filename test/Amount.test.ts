import Amount from "@/domain/amount/Amount";
import NegativeAmountException from "@/domain/amount/NegativeAmountException";
import NotAllowedCurrencyException from "@/domain/amount/NotAllowedCurrencyException";

describe("Amount Should", () => {
  it("Throw error if has a negative amount", () => {
    const amount = -1000;
    const currency = "USD";
    expect(() => new Amount(amount, currency)).toThrow(NegativeAmountException);
  });

  it("Throw error if does not have an allowed currency", () => {
    const amount = 1000;
    const currency = "ABC";
    expect(() => new Amount(amount, currency)).toThrow(
      NotAllowedCurrencyException
    );
  });
});
