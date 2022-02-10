import { BasePageHelper } from "../../base-page.helper";
import { EndpointHelper } from "../../../components/misc-utils/endpoint-helper";
import { StepLogger } from "../../../../core/logger/step-logger";
import { PaymentCycle } from "../models/payment-cycle.model";
import { CommonPage } from "../common/common.po";
import { CoreConstants } from "../../../components/html/core-constants";
import { CommonPageHelper } from "../common/common-page.helper";
import { PaymentCyclePage } from "./payment-cycle-page.po";
import { Debits, Status } from "../models/debits.model";
import { Credits } from "../models/credits.model";
import { ExpectationHelper } from "./../../../components/misc-utils/expectation-helper";
import faker from "@faker-js/faker";

const { INITIAL_DATE, END_DATE } = CoreConstants;
export class PaymentCycleHelper extends BasePageHelper {
  private static _instance: PaymentCycleHelper;

  private constructor() {
    super();
  }

  public static getInstance(): PaymentCycleHelper {
    return this._instance || (this._instance = new this());
  }

  /**
   * Navigate to Payment Cycles page.
   */
  static async navigateToPaymentCyclesPage() {
    StepLogger.subStep("Click the Register menu");
    await CommonPage.sideMenu.registerMenuLink.clickButton();
    StepLogger.subStep("Click the Payment Cycle menu");
    await CommonPage.sideMenu.paymentCyclesMenuLink.clickButton();
  }

  /**
   * Verify Page Header section is displayed.
   */
  static async verifyPaymentCycleSectionLabel() {
    StepLogger.subVerification("Verify Page Header section is displayed");
    await CommonPageHelper.verifyHeaderSectionLabelDisplayedStatus();
    await CommonPageHelper.verifyHeaderSectionHasText(
      PaymentCyclePage.header.paymentCycleHeader
    );
  }

  static async clickAddButton() {
    StepLogger.subStep("Click on the Add button under Payment Cycle section.");
    await PaymentCyclePage.form.add.clickButton();
  }

  static async verifyPaymentCycleDisplayed(paymentCycle: PaymentCycle) {
    await this.verifyPaymentCycleSectionLabel();
    StepLogger.subVerification(
      "Verify Name cell has value: " + paymentCycle.name
    );
    await ExpectationHelper.verifyText(
      PaymentCyclePage.getListTableCell("Name", paymentCycle.name),
      paymentCycle.name
    );

    StepLogger.subVerification(
      "Verify Month cell has value: " + paymentCycle.month
    );
    let month = `${paymentCycle.month}`;
    await ExpectationHelper.verifyText(
      PaymentCyclePage.getListTableCell("Month", month),
      month
    );

    let year = `${paymentCycle.year}`;
    StepLogger.subVerification(
      "Verify Year cell has value: " + paymentCycle.year
    );
    await ExpectationHelper.verifyText(
      PaymentCyclePage.getListTableCell("Year", year),
      year
    );
  }

  static async verifyAddPaymentCycleFormDisplayed() {
    StepLogger.subVerification("Verify Name textbox is displayed.");
    await PaymentCyclePage.form.nameTextbox.verifyDisplayedStatus();
    StepLogger.subVerification("Verify Month textbox is displayed.");
    await PaymentCyclePage.form.monthTextbox.verifyDisplayedStatus();
    StepLogger.subVerification("Verify Year textbox is displayed.");
    await PaymentCyclePage.form.yearTextbox.verifyDisplayedStatus();
  }

  public static getPaymentCycle(): PaymentCycle {
    const date: Date = faker.date.between(INITIAL_DATE, END_DATE);
    const credits: Credits[] = [
      { name: faker.name.findName(), value: String(date.getMonth() + 1) },
    ];
    let debits: Debits[] = [
      {
        name: faker.name.findName(),
        value: String(date.getMonth() + 1),
        status: Status.AGENDADO,
      },
    ];

    let paymentCycle: PaymentCycle = {
      name: faker.name.findName(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      credits,
      debits,
    };
    return paymentCycle;
  }

  static async fillPaymentCycleFormAndClickSaveButton(
    paymentCycle: PaymentCycle
  ) {
    StepLogger.subStep("Type the payment cycle name.");
    await PaymentCyclePage.form.nameTextbox.sendKeys(paymentCycle.name);

    StepLogger.subStep("Type the payment cycle month.");
    await PaymentCyclePage.form.monthTextbox.sendKeys(`${paymentCycle.month}`);

    StepLogger.subStep("Type the payment cycle year.");
    await PaymentCyclePage.form.yearTextbox.sendKeys(`${paymentCycle.year}`);

    await this.addPaymentCredit(paymentCycle);
    await this.addPaymentDebit(paymentCycle);

    StepLogger.subStep("Click the Save button.");
    await PaymentCyclePage.form.save.scrollToElement();
    await PaymentCyclePage.form.save.clickButton();
  }

  static async addPaymentCredit(paymentCycle: PaymentCycle) {
    for (let i = 0; i < paymentCycle.credits.length; i++) {
      let credit = paymentCycle.credits[i];
      StepLogger.subStep("Type the payment cycle credit name.");
      await PaymentCyclePage.getCreditNameTextbox(i).sendKeys(credit.name);

      StepLogger.subStep("Type the payment cycle credit value.");
      await PaymentCyclePage.getCreditValueTextbox(i).sendKeys(credit.value);

      if (i + 1 < paymentCycle.credits.length) {
        StepLogger.subStep("Click the payment cycle credit Add button.");
        await PaymentCyclePage.getCreditAddButton(i).clickButton();
      }
    }
  }

  static async addPaymentDebit(paymentCycle: PaymentCycle) {
    for (let i = 0; i < paymentCycle.debits.length; i++) {
      let debit = paymentCycle.debits[i];
      StepLogger.subStep("Type the payment cycle debit name.");
      await PaymentCyclePage.getDebitNameTextbox(i).sendKeys(debit.name);

      StepLogger.subStep("Type the payment cycle debit value.");
      await PaymentCyclePage.getDebitValueTextbox(i).sendKeys(debit.value);

      StepLogger.subStep("Type the payment cycle debit status.");
      await PaymentCyclePage.getDebitStatusTextbox(i).sendKeys(
        Status[debit.status]
      );

      if (i + 1 < paymentCycle.debits.length) {
        StepLogger.subStep("Click the payment cycle debit Add button.");
        await PaymentCyclePage.getDebitAddButton(i).clickButton();
      }
    }
  }

  url(): string {
    return EndpointHelper.homePage;
  }
}
