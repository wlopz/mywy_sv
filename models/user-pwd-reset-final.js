var UserPasswordResetFinal = function(mwy) {
    this.email = mwy.email;
    this.newPassword = mwy.newPassword,
    this.newPasswordConfirm = mwy.newPasswordConfirm,
    this.passwordResetHash = mwy.passwordResetHash
};
module.exports = UserPasswordResetFinal;