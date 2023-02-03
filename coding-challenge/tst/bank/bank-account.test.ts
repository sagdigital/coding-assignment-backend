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
        expect(bankAccountBalance).toEqual(initialBalance);
    });

    //#endregion

    //#region Withdraw

    it('should throw a "Withdraw amount has to be greater than 0!" error!', () => {
        // Arrange
        const withdrawAmount = -5;

        // Act & Assert
        expect(() => {
            bankAccount.withdraw(withdrawAmount)
        }).toThrowError('Withdraw amount has to be greater than 0!');
    });

    it('should throw a "Insufficient funds!" error', () => {
        // Act & Assert
        expect(() => {
            bankAccount.withdraw(initialBalance + 1)
        }).toThrowError('Insufficient funds!');
    });

    it('should withdraw the specified amount and update the current balance', () => {
        // Arrange
        const withdrawAmount = 45;

        // Act 
        bankAccount.withdraw(withdrawAmount);

        // Assert
        expect(bankAccount.checkBalance()).toEqual(initialBalance - withdrawAmount);
        
    });
    //#endregion

    //#region Deposit

    it('should throw a "Deposit amount has to be greater than 0!" error!', () => {
        // Arrange
        const depositAmount = -5;

        // Act & Assert
        expect(() => {
            bankAccount.deposit(depositAmount)
        }).toThrowError("Deposit amount has to be greater than 0!");
    });

    it('should update the account balance with the specified sum!', () => {
        // Arange
        const depositAmount = 100;

        //Act
        bankAccount.deposit(depositAmount);

        //Assert
        expect(bankAccount.checkBalance()).toEqual(initialBalance + depositAmount);
    });

    //#endregion

    //#region Transfer

    it('should transfer the specified sum from the destination account to the source account!', () => {
        // Arrange
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');
        const transferAmount = 100;

        jest.spyOn(BankAccount.prototype, 'withdraw').mockImplementationOnce(() => {
            bankAccount['balance'] -= transferAmount;
        });

        jest.spyOn(BankAccount.prototype, 'deposit').mockImplementationOnce(() => {
            destinationAccount['balance'] = transferAmount;
        })

        // Act
        bankAccount.transfer(transferAmount, destinationAccount);

        // Assert
        expect(bankAccount['balance']).toEqual(initialBalance - transferAmount);
        expect(destinationAccount['balance']).toEqual(transferAmount);
    });

    it('throws an error if the balance is insufficient', () => {
        // Arrange
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');

        // Act & Assert
        expect(() => {
            bankAccount.transfer(50000, destinationAccount)
        }).toThrowError('Insufficient funds!');
      });

    it('should transfer the specified sum back to the source account if the deposit operation fails!', () => {
        // Arrange
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');
        const transferAmount = 100;

        const depositAction = jest.spyOn(destinationAccount, 'deposit').mockImplementationOnce(() => {
            throw new Error('Transfer operation failed!');
        })

        // Act & Assert
        expect(() => {
            bankAccount.transfer(transferAmount, destinationAccount)
        }).toThrowError('Transfer operation failed!');
        expect(bankAccount.checkBalance()).toEqual(initialBalance);
        expect(depositAction).toHaveBeenCalledWith(transferAmount);
    });
    //#endregion
})