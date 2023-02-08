"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
var uuid_1 = require("uuid");
var BankAccount = /** @class */ (function () {
    function BankAccount(accountHolder) {
        this.balance = 0;
        this.accountHolder = accountHolder;
        this.accountNumber = (0, uuid_1.v4)();
    }
    BankAccount.prototype.withdraw = function (withdrawAmount) {
        if (withdrawAmount < 0) {
            throw new Error('Withdraw amount has to be greater than 0!');
        }
        if (this.balance < withdrawAmount) {
            throw new Error('Insufficient funds!');
        }
        this.balance -= withdrawAmount;
    };
    ;
    BankAccount.prototype.deposit = function (depositAmount) {
        if (depositAmount < 0) {
            throw new Error('Deposit amount has to be greater than 0!');
        }
        this.balance += depositAmount;
    };
    ;
    BankAccount.prototype.checkBalance = function () {
        return this.balance;
    };
    ;
    // This method should take a sum out of the source account and transfer it to the destination bank account.
    BankAccount.prototype.transfer = function (transferAmount, destinationBankAccount) {
        var initialBalance = this.balance;
        try {
            this.withdraw(transferAmount);
            destinationBankAccount.deposit(transferAmount);
        }
        catch (e) {
            // Transfer the specified sum back to the source account if the deposit operation fails, but widraw was succesful
            if (this.balance != initialBalance) {
                this.balance += transferAmount;
            }
            throw e;
        }
    };
    ;
    return BankAccount;
}());
exports.BankAccount = BankAccount;
//# sourceMappingURL=bank-account.js.map