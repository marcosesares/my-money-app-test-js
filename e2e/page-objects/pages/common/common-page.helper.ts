import { AlertHelper } from "../../../components/html/alert-helper";
import { ExpectationHelper } from "../../../components/misc-utils/expectation-helper";

import { CommonPage } from "./common.po";

export class CommonPageHelper {
  /**
   * Click the Register Menu Link
   */
  public static async clickRegisterMenuLink() {
    await CommonPage.sideMenu.registerMenuLink.clickButton();
  }

  /**
   * Click the Dashboard Menu Link
   */
  public static async clickDashboardMenuLink() {
    await CommonPage.sideMenu.dashboardMenuLink.clickButton();
  }

  /**
   * Click the Payment Cycles Menu Link
   */
  public static async clickPaymentCyclesMenuLink() {
    await CommonPage.sideMenu.paymentCyclesMenuLink.clickButton();
  }

  /**
   * Verify Register Menu Link is displayed.
   */
  static async verifyRegisterMenuLinkDisplayedStatus() {
    await CommonPage.sideMenu.registerMenuLink.verifyDisplayedStatus();
  }

  /**
   * Verify Payment Cycles Menu Link is displayed.
   */
  static async verifyPaymentCyclesMenuLinkDisplayedStatus() {
    await CommonPage.sideMenu.paymentCyclesMenuLink.verifyDisplayedStatus();
  }

  /**
   * Verify Dashboard Menu Link is displayed.
   */
  static async verifyDashboardMenuLinkDisplayedStatus() {
    await CommonPage.sideMenu.dashboardMenuLink.verifyDisplayedStatus();
  }

  /**
   * Verify alert message and accept
   */
  public static async verifyAlertMessageAndAccept(message: string) {
    await ExpectationHelper.verifyAlertMessage(message);
    await AlertHelper.acceptAlert();
  }

  /**
   * Verify alert message abscent
   */
  public static async verifyAlertMessageAbsent() {
    await ExpectationHelper.verifyAlertMessageAbsent();
  }

  /**
   * Verify My Money App Dashboard page Header section label is displayed.
   */
  static async verifyMyMoneyAppLogoDisplayedStatus() {
    await CommonPage.form.appLogo.verifyDisplayedStatus();
  }

  /**
   * Verify My Money App Dashboard page Header section label is displayed.
   */
  static async verifyHeaderSectionLabelDisplayedStatus() {
    await CommonPage.form.headerSectionLabel.verifyDisplayedStatus();
  }

  /**
   * Verify My Money App Dashboard page Header section label has text.
   */
  static async verifyHeaderSectionHasText(text: string) {
    await CommonPage.form.headerSectionLabel.verifyElementHasText(text);
  }

  /**
   * Verify Logged in User label is displayed.
   */
  static async verifyUserNameLabelDisplayedStatus() {
    await CommonPage.form.userNameLabel.verifyDisplayedStatus();
  }
}
