import { v4 as uuid } from 'uuid';

export class BankAccount {
    private balance: number = 0;
    private accountHolder: string;
    private accountNumber: string;

    constructor(accountHolder: string) {
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

    checkBalance(): number {
        return this.balance;
    };

    // This method should take a sum out of the source account and transfer it to the destination bank account.
    transfer(transferAmount: number, destinationBankAccount: BankAccount) {
        const initialBalance = this.balance;

        try {
            this.withdraw(transferAmount);
            destinationBankAccount.deposit(transferAmount);
        }
        catch (e: unknown) {
            // Transfer the specified sum back to the source account if the deposit operation fails, but withdrawal was successful
            if (this.balance != initialBalance) {
                this.balance += transferAmount;
            }

            throw e
        }
    };
}