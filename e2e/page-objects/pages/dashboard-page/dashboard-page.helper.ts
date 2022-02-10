import { BasePageHelper } from "../../base-page.helper";
import { DashboardPage } from "./dashboard-page.po";
import { EndpointHelper } from "../../../components/misc-utils/endpoint-helper";
import { CommonPageHelper } from "./../common/common-page.helper";
import { DashboardPageConstant } from "./dashboard-page.constants";
import { ExpectationHelper } from "./../../../components/misc-utils/expectation-helper";

export class DashboardPageHelper extends BasePageHelper {
  private static _instance: DashboardPageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): DashboardPageHelper {
    return this._instance || (this._instance = new this());
  }

  /**
   * Verify My Money App Dashboard page Header section label is displayed.
   */
  static async verifyDashboardSectionDisplayedStatus() {
    await CommonPageHelper.verifyHeaderSectionLabelDisplayedStatus();
  }

  /**
   * Verify Logged in User label is displayed.
   */
  static async verifyUserNameLabelDisplayedStatus() {
    await CommonPageHelper.verifyUserNameLabelDisplayedStatus();
  }

  /**
   * Verify Total Credits section label is displayed.
   */
  static async verifyTotalCreditsLabelText() {
    await DashboardPage.mainSection.totalCredits.verifyDisplayedStatus();
    await DashboardPage.mainSection.totalCredits.verifyElementHasText(
      DashboardPageConstant.attributes.labels.totalCredits
    );
  }

  /**
   * Verify Total Debits section label is displayed.
   */
  static async verifyTotalDebitsLabelText() {
    await DashboardPage.mainSection.totalDebits.verifyDisplayedStatus();
    await DashboardPage.mainSection.totalDebits.verifyElementHasText(
      DashboardPageConstant.attributes.labels.totalDebits
    );
  }

  /**
   * Verify Total Consolidated section label is displayed.
   */
  static async verifyConsolidatedLabelText() {
    await DashboardPage.mainSection.consolidated.verifyDisplayedStatus();
    await DashboardPage.mainSection.consolidated.verifyElementHasText(
      DashboardPageConstant.attributes.labels.consolidated
    );
  }

  /**
   * Verify Total Consolidated value calculation.
   */
  static async verifyConsolidatedValue() {
    const credits = +(
      await DashboardPage.mainSection.totalCreditsValue.getText()
    ).slice(1);
    const debits = +(
      await DashboardPage.mainSection.totalDebitsValue.getText()
    ).slice(1);
    const consolidated = +(
      await DashboardPage.mainSection.consolidatedValue.getText()
    ).slice(1);
    const total = credits - debits;
    await ExpectationHelper.verifyNumberValueEqualTo(
      DashboardPage.mainSection.consolidatedValue,
      consolidated,
      total
    );
  }

  url(): string {
    return EndpointHelper.homePage;
  }
}
