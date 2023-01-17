import {v4 as uuid} from 'uuid';

export class BankAccount {
    public balance: number = 0;
    public accountHolder: string;
    public accountNumber: string;

    constructor(accountHolder) {
        this.accountHolder = accountHolder;
        this.accountNumber = uuid();
    }

    withdraw(withdrawAmount: number) {
        if (withdrawAmount < 0) {
            throw new Error('Withdraw amount has to be greater than 0!');
        }

        if (this.balance < withdrawAmount) {
            throw new Error('Insufficient funds!');
        }

        this.balance -= withdrawAmount;
    };

    deposit(depositAmount: number) {
        this.balance += depositAmount;
    };

    checkBalance() {
        return this.balance;
    };

    transfer(transferAmount: number, destinationBankAccount: BankAccount) {
      // This method should take a sum out of the source account and transfer it to the destination bank account.
    };
}