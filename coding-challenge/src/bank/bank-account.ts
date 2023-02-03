import {v4 as uuid} from 'uuid';
import { validation } from '../bank/validation';

export class BankAccount {
    private balance: number = 0;
    private accountHolder: string;
    private accountNumber: string;

    constructor(accountHolder) {
        this.accountHolder = accountHolder;
        this.accountNumber = uuid();
    }

    public withdraw(withdrawAmount: number): void {
      validation.validateAmount(withdrawAmount, "Withdraw");
      validation.validateFunds(this.balance, withdrawAmount);
      this.balance -= withdrawAmount;
    };

    public deposit(depositAmount: number): void {
      validation.validateAmount(depositAmount, "Deposit");
      this.balance += depositAmount;
    };

    public checkBalance(): number {
        return this.balance;
    };

    public transfer(transferAmount: number, destinationBankAccount: BankAccount): void {
      validation.validateAmount(transferAmount, "Transfer");
      validation.validateFunds(this.balance, transferAmount);
      this.withdraw(transferAmount);
      destinationBankAccount.deposit(transferAmount);
    };
}

