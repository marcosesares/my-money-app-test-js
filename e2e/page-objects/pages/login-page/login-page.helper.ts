import { BasePageHelper } from "../../base-page.helper";
import { User } from "../models/user.model";

import { LoginPage } from "./login-page.po";
import { EndpointHelper } from "../../../components/misc-utils/endpoint-helper";
import { CommonPageHelper } from "./../common/common-page.helper";
import { StepLogger } from "../../../../core/logger/step-logger";

export class LoginPageHelper extends BasePageHelper {
  private static _instance: LoginPageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): LoginPageHelper {
    return this._instance || (this._instance = new this());
  }

  /**
   * Enter Email, Password and click 'LogIn' button
   * @param user
   */
  static async fillLoginFormAndClickLoginButton(user: User) {
    await this.fillLoginForm(user);
    StepLogger.subStep("Click the LogIn button.");
    await LoginPage.loginForm.logIn.clickButton();
  }

  /**
   * Enter Email, Password
   * @param user
   */
  static async fillLoginForm(user: User) {
    StepLogger.subStep("Type the user email.");
    await LoginPage.loginForm.email.sendKeys(user.email);
    StepLogger.subStep("Type the user password.");
    await LoginPage.loginForm.password.sendKeys(user.password);
  }

  /**
   * Verify My Money App Header section is displayed.
   */
  static async verifyHeaderSectionLabelDisplayedStatus() {
    await CommonPageHelper.verifyHeaderSectionLabelDisplayedStatus();
  }

  /**
   * Verify My Money App logo is displayed.
   */
  static async verifyMyMoneyAppLogoDisplayedStatus() {
    await CommonPageHelper.verifyMyMoneyAppLogoDisplayedStatus();
  }

  /**
   * Verify User is able to login.
   */
  static async verifyUserLoggedIn() {
    await this.verifyMyMoneyAppLogoDisplayedStatus();
    await this.verifyHeaderSectionLabelDisplayedStatus();
  }

  url(): string {
    return EndpointHelper.homePage;
  }
}
