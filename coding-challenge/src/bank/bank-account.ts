import {v4 as uuid} from 'uuid';

export class BankAccount {
    public balance: number = 0;
    public accountHolder: string;
    public accountNumber: string;

    constructor(accountHolder) {
        this.accountHolder = accountHolder;
        this.accountNumber = uuid();
    };

    withdraw(withdrawAmount: number) {
        let initialBalance = this.balance;
        
        if (withdrawAmount <= 0) {
            this.balance = initialBalance;
            throw new Error('Withdraw amount has to be greater than 0!');
        }
        if (this.balance < withdrawAmount) {
            this.balance = initialBalance;
            throw new Error('Insufficient funds!');
        }

        this.balance -= withdrawAmount;
    };

    deposit(depositAmount: number) {
        let initialBalance = this.balance;
        
        if (depositAmount <= 0) {
            this.balance = initialBalance;
            throw new Error('Deposit amount has to be greater than 0');
        }
        this.balance += depositAmount;
    };

    checkBalance() {
        return this.balance;
    };

    transfer(transferAmount: number, destinationBankAccount: BankAccount) {
        let initialBalance = this.balance;
        
        try {
            this.withdraw(transferAmount);
            destinationBankAccount.deposit(transferAmount);
        } catch {
            this.balance = initialBalance;
            throw new Error('Something went wrong, Your balance is not touched');
        }
    };
}