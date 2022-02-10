export class SignUpPageConstant {
  static readonly attributes = {
    selectors: {
      confirmPassword: "input[placeholder='Confirm Password']",
      register: "//button[normalize-space()='Register']",
      signUpLink: "//button[normalize-space()='New User? Register here!']",
      name: "input[placeholder='Name']",
    },
    labels: {
      confirmPassword: "Confirm Password Textfield",
      register: "Register Button",
      signUpLink: "New User? Register here! Link",
      name: "Name Textfield",
    },
  };
}
