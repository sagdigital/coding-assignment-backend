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
        
        if (!validationResult.isValid) {
            throw validationResult.error;
        } 
        
        this.balance -= withdrawAmount;
    };

    public deposit(depositAmount: number): void {
        const validationResult = this.validateDepositAmount(depositAmount);

        if (!validationResult.isValid) {
            throw validationResult.error;
        } 

        this.balance += depositAmount;
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
            isValid: true
        };

        if (this.balance < withdrawAmount) {
            result.error = new Error('Insufficient funds!');
            result.isValid = false;
        }

        if (withdrawAmount < 0) {
            result.error = new Error('Withdraw amount has to be greater than 0!');
            result.isValid = false;
        }

        return result;
    }
    
    private validateDepositAmount(depositAmount: number): ValidationResult {
        const result: ValidationResult = {
            isValid: true
        };

        if (depositAmount < 0) {
            result.error = new Error('Deposit amount has to be greater than 0!');
            result.isValid = false;
        }

        return result;
    }
}