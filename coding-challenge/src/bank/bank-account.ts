import {v4 as uuid} from 'uuid';

export class BankAccount {
    private balance: number = 0;
    public accountHolder: string;
    public accountNumber: string;

    public constructor(accountHolder) {
        this.accountHolder = accountHolder;
        this.accountNumber = uuid();
    }

    public withdraw(withdrawAmount: number): void {
        if (withdrawAmount < 0) {
            throw new Error('Withdraw amount has to be greater than 0!');
        }

        if (this.balance < withdrawAmount) {
            throw new Error('Insufficient funds!');
        }

        this.balance -= withdrawAmount;
    };

    public deposit(depositAmount: number): void {
        if (depositAmount < 0) {
            throw new Error('Deposit amount has to be greater than 0!');
        }

        this.balance += depositAmount;
    };

    public checkBalance(): number {
        return this.balance;
    };

    public transfer(transferAmount: number, destinationBankAccount: BankAccount): void {
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