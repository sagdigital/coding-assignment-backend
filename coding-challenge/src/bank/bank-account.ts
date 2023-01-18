import {v4 as uuid} from 'uuid';
import { ValidationResult } from '../interfaces/validation-result';

export class BankAccount {
    
    private balance: number = 0;

    public accountHolder: string;
    public accountNumber: string;

    constructor(accountHolder: string) {
        this.accountHolder = accountHolder;
        this.accountNumber = uuid();
    }

    public withdraw(withdrawAmount: number): void {
        const validationResult = this.validateWithdrawAmount(withdrawAmount);
        
        if (validationResult.isValid) {
            this.balance -= withdrawAmount;
        } else {
            throw validationResult.error;
        }
    };

    public deposit(depositAmount: number): void {
        const validationResult = this.validateDepositAmount(depositAmount);

        if (validationResult.isValid) {
            this.balance += depositAmount;
        } else {
            throw validationResult.error;
        }
    };

    // It should be considered to change this function to a get function.
    public checkBalance(): number {
        return this.balance;
    };
    
    public transfer(transferAmount: number, destinationBankAccount: BankAccount): void {
        this.withdraw(transferAmount);
        try {
            destinationBankAccount.deposit(transferAmount);
        } catch (error) {
            this.deposit(transferAmount);
            throw error;            
        }
    };

    private validateWithdrawAmount(withdrawAmount: number): ValidationResult {
        const result: ValidationResult = {
            isValid: false
        };

        if (this.balance < withdrawAmount) {
            result.error = new Error('Insufficient funds!');
        } else if (withdrawAmount < 0) {
            result.error = new Error('Withdraw amount has to be greater than 0!');
        } else {
            result.isValid = true;
        }

        return result;
    }
    
    private validateDepositAmount(depositAmount: number): ValidationResult {
        const result: ValidationResult = {
            isValid: false
        };

        if (depositAmount < 0) {
            result.isValid = false;
            result.error = new Error('Deposit amount has to be greater than 0!');
        } else {
            result.isValid = true;
        }

        return result;
    }
}