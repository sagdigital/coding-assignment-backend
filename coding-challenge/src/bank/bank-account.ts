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
        if (depositAmount < 0) {
            throw new Error('Deposit amount has to be greater than 0!');
        }

        this.balance += depositAmount;
    };

    checkBalance() {
        return this.balance;
    };

    transfer(transferAmount: number, destinationBankAccount: BankAccount) {
        if (transferAmount < 0) {
            throw new Error('Transfer amount has to be greater than 0!');
        }

        this.withdraw(transferAmount);

        try {
            destinationBankAccount.deposit(transferAmount);
        } catch {
            this.deposit(transferAmount);
        }
    };
}