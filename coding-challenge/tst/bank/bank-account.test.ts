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

    it('should throw a "Withdraw amount has to be greater than 0!" error', () => {
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
        const withdrawAmount = 5;

        // Act
        bankAccount.withdraw(withdrawAmount);
        const bankAccountBalance = bankAccount.checkBalance();

        // Assert
        expect(bankAccountBalance).toBe(initialBalance - withdrawAmount);
    });

    //#endregion

    //#region Deposit

    it('should throw a "Deposit amount has to be greater than 0!" error', () => {
        // Arrange
        const withdrawAmount = -5;

        // Act & Assert
        expect(() => {
            bankAccount.deposit(withdrawAmount)
        }).toThrow('Deposit amount has to be greater than 0!');
    });

    it('should update the account balance with the specified sum!', () => {
        // Arrange
        const depositAmount = 5;

        // Act
        bankAccount.deposit(depositAmount);
        const bankAccountBalance = bankAccount.checkBalance();

        // Assert
        expect(bankAccountBalance).toBe(initialBalance + depositAmount);
    });

    //#endregion

    //#region Transfer

    it('should transfer the specified sum from the destination account to the source account!', () => {
        // Arrange
        const transferAmount = 100;
        const destinationAccountInitialBalance = 10;
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');
        destinationAccount['balance'] = destinationAccountInitialBalance;
        
        jest.spyOn(BankAccount.prototype, 'withdraw').mockImplementationOnce(() => {
            bankAccount['balance'] -= transferAmount;
        });

        jest.spyOn(BankAccount.prototype, 'deposit').mockImplementationOnce(() => {
            destinationAccount['balance'] += transferAmount;
        });

        // Act
        bankAccount.transfer(transferAmount, destinationAccount);

        // Assert
        expect(bankAccount['balance']).toBe(initialBalance - transferAmount);
        expect(destinationAccount['balance']).toBe(destinationAccountInitialBalance + transferAmount);
    });

    it('should transfer the specified sum back to the source account if the deposit operation fails!', () => {
        // Arrange
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');
        const transferAmount = 100;
        jest.spyOn(destinationAccount, 'deposit').mockImplementationOnce(() => {
            throw new Error();
        });

        // Act and Assert
        try {
            bankAccount.transfer(transferAmount, destinationAccount);
        } catch {
            expect(bankAccount['balance']).toBe(initialBalance);
        }
    });

    it('should throw a "Transfer amount has to be greater than 0!!" error', () => {
        // Arrange
        const transferAmount = -100;
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');

        // Act & Assert
        expect(() => {
            bankAccount.transfer(transferAmount, destinationAccount);
        }).toThrow('Transfer amount has to be greater than 0!');
    });
    
    //#endregion

})