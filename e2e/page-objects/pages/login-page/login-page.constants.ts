export class LoginPageConstant {
  static readonly attributes = {
    selectors: {
      email: "email",
      password: "password",
      logIn: "//button[text()='Login']",
      loginLink:
        "//button[normalize-space()='Already registered? Login here!']",
      loginBoxMsg: ".login-box-msg",
    },
    labels: {
      email: "User email",
      password: "User password",
      logIn: "Login Button",
      loginLink: "Already registered? Login here! link",
      loginBoxMsg: "Page Header Label",
    },
  };

  static readonly errorMessages = {
    incorrectLoginPassword: "Invalid User/Password",
  };
}
