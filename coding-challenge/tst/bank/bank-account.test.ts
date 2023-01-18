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
        const error = new Error('Withdraw amount has to be greater than 0!');

        // Act & Assert
        try {
            bankAccount.withdraw(withdrawAmount);
        } catch (err) {
            expect(err).toBe(error);
        }
    });

    it('should throw a "Insufficient funds!" error', () => {
        // Arrange
        const error = new Error('Insufficient funds!');

        // Act & Assert
        try {
            bankAccount.withdraw(initialBalance + 1);
        } catch (err) {
            expect(err).toBe(error);
        }
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
        const error = new Error('Deposit amount has to be greater than 0!');

        // Act & Assert
        try {
            bankAccount.deposit(depositAmount)
        } catch (err) {
            expect(err).toBe(error);            
        }

        // Act & Assert
        // expect(() => {
        //     bankAccount.deposit(depositAmount)
        // }).toThrow('Deposit amount has to be greater than 0!');
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
})