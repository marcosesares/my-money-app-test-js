import { BasePageHelper } from "../../base-page.helper";
import { SignUpPage } from "./signup-page.po";
import { EndpointHelper } from "../../../components/misc-utils/endpoint-helper";
import { User } from "./../models/user.model";
import { StepLogger } from "../../../../core/logger/step-logger";
import { LoginPageHelper } from "../login-page/login-page.helper";

export class SignUpPageHelper extends BasePageHelper {
  private static _instance: SignUpPageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): SignUpPageHelper {
    return this._instance || (this._instance = new this());
  }

  /**
   * Enter Name, Email, Password, ConfirmPassword and click 'Register' button.
   * @param user
   */
  static async fillSignUpFormAndClickRegisterButton(user: User) {
    await this.fillSignUpForm(user);
    StepLogger.subStep("Click the Register Button.");
    await SignUpPage.form.register.clickButton();
  }

  /**
   * Enter Name, Email, Password, ConfirmPassword.
   * @param user
   */
  static async fillSignUpForm(user: User) {
    StepLogger.subStep("Click the New User? Register here! Link.");
    await SignUpPage.form.signUpLink.clickButton();
    await LoginPageHelper.fillLoginForm(user);
    StepLogger.subStep("Type the user name.");
    await SignUpPage.form.name.sendKeys(user.name);
    StepLogger.subStep("Type the user confirmation password.");
    await SignUpPage.form.confirmPassword.sendKeys(user.password);
  }

  url(): string {
    return EndpointHelper.homePage;
  }
}
