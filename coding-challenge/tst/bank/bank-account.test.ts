import {BankAccount} from "../../src/bank/bank-account";

describe('Tests for bank account class', () => {
    let bankAccount: BankAccount;
    const initialBalance = 12345;

    beforeEach(async () => {
        bankAccount = new BankAccount('UserBankAccount');
        bankAccount['balance'] = initialBalance;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    //#region CheckBalance

    it('should return account balance', () => {
        // Act
        const bankAccountBalance = bankAccount.checkBalance();

        // Assert
        expect(bankAccountBalance).toBe(initialBalance);
    });

    //#endregion

    //#region Withdraw

    it('should throw a "Withdraw amount has to be greater than 0!" error!', () => {
        // Arrange
        const withdrawAmount = -5;

        // Act & Assert
        expect(() => {
            bankAccount.withdraw(withdrawAmount)
        }).toThrow('Withdraw amount has to be greater than 0!');
    });

    it('should throw a "Insufficient funds!" error', () => {
        // Act & Assert
        expect(() => {
            bankAccount.withdraw(initialBalance + 1)
        }).toThrow('Insufficient funds!');
    });

    it('should withdraw the specified amount and update the current balance', () => {
        // Arrange
        const withdrawAmount = 50;

        // Act
        bankAccount.withdraw(withdrawAmount);

        // Assert
        expect(bankAccount['balance']).toBe(initialBalance - withdrawAmount);
    });

    //#endregion

    //#region Deposit

    it('should throw a "Deposit amount has to be greater than 0" error!', () => {
        // Arrange
        const depositAmount = -5;

        // Act & Assert
        expect(() => {
            bankAccount.deposit(depositAmount)
        }).toThrow('Deposit amount has to be greater than 0!');
        
    });

    it('should update the account balance with the specified sum!', () => {
        // Arrange
        const depositAmount = 100;

        // Act
        bankAccount.deposit(depositAmount);

        // Assert
        expect(bankAccount['balance']).toBe(initialBalance + depositAmount);
    });

    //#endregion

    //#region Transfer

    it('should transfer the specified sum back to the source account if the deposit operation fails!', () => {
        // Arrange
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');
        const transferAmount = 100;

        jest.spyOn(BankAccount.prototype, 'withdraw').mockImplementationOnce(() => {
            bankAccount['balance'] -= transferAmount;
        });

        jest.spyOn(BankAccount.prototype, 'deposit').mockImplementationOnce(() => {
            throw new Error("Failed to deposit funds");
        });

        // Act & Assert
        try {
            bankAccount.transfer(transferAmount, destinationAccount);
        } catch (error) {
            expect(bankAccount['balance']).toBe(initialBalance);
        }
    });

    //#endregion

    //#region Validation

    it('validateWithdrawAmount returns error when balance is insufficient', () => {
        const validationResult = bankAccount['validateWithdrawAmount'](initialBalance + 1);
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.error).toEqual(new Error('Insufficient funds!'));
    });
    
    it('validateWithdrawAmount returns error when withdraw amount is less than zero', () => {
        const validationResult = bankAccount['validateWithdrawAmount'](-1);
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.error).toEqual(new Error('Withdraw amount has to be greater than 0!'));
    });
    
    it('validateWithdrawAmount returns valid when withdraw amount is valid', () => {
        bankAccount.deposit(100);
        const validationResult = bankAccount['validateWithdrawAmount'](50);
        expect(validationResult.isValid).toBe(true);
        expect(validationResult.error).toBeUndefined();
    });

    
    test('should return an error if deposit amount is negative', () => {
        const validationResult = bankAccount['validateDepositAmount'](-10);
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.error).toBeInstanceOf(Error);
        expect(validationResult.error?.message).toBe('Deposit amount has to be greater than 0!');
    });

    test('should not return an error if deposit amount is positive', () => {
        const validationResult = bankAccount['validateDepositAmount'](10);
        expect(validationResult.isValid).toBe(true);
        expect(validationResult.error).toBeUndefined();
    });

    //#endregion
})