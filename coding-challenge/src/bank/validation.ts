export class validation {
    public static validateAmount(amount: number, fnc: string): void {
        if (amount <= 0) {
          throw new Error(`${fnc} amount has to be greater than 0!`);
        }
      }
      
    public static validateFunds(balance: number, amount: number): void {
        if (balance < amount) {
          throw new Error(`Insufficient funds!`);
        }
      }
}