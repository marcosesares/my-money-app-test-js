import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../components/html/page-helper";
import { CredentialsHelper } from "../../../components/misc-utils/credentials-helper";
import { CommonPageHelper } from "../../../page-objects/pages/common/common-page.helper";
import { LoginPageHelper } from "../../../page-objects/pages/login-page/login-page.helper";
import { PaymentCycleHelper } from "../../../page-objects/pages/payment-cycle-page/payment-cycle-page.helper";
import { SuiteNames } from "../../helpers/suite-names";

describe(SuiteNames.regressionSuite, () => {
  let loginPageHelper: LoginPageHelper;
  const mcesar = CredentialsHelper.mcesar;

  beforeAll(async () => {
    await PageHelper.maximizeBrowser();
    loginPageHelper = LoginPageHelper.getInstance();
    StepLogger.preCondition("Open My Money application.");
    await loginPageHelper.goTo();
    StepLogger.verification(
      "Verify My Money App Dashboard page Header section label is displayed."
    );
    await CommonPageHelper.verifyMyMoneyAppLogoDisplayedStatus();
  });

  beforeEach(async () => {
    StepLogger.feature(__filename.replace(process.cwd(), ""));
    StepLogger.preCondition(
      "Enter Login information and click the Login button."
    );
    await LoginPageHelper.fillLoginFormAndClickLoginButton(mcesar);
    StepLogger.verification("Verify My Money App logo is displayed.");
    await LoginPageHelper.verifyUserLoggedIn();
  });

  it("Add a Payment Cycle. - [1004]", async () => {
    StepLogger.caseId = 1004;
    const paymentCycle = PaymentCycleHelper.getPaymentCycle();

    StepLogger.stepId(1);
    StepLogger.step("Navigate to Payment Cycles page.");
    await PaymentCycleHelper.navigateToPaymentCyclesPage();
    StepLogger.verification("Verify Payment Cycles page is displayed.");
    PaymentCycleHelper.verifyPaymentCycleSectionLabel();

    StepLogger.stepId(2);
    StepLogger.step("Click the Add a Payment Cycle button.");
    await PaymentCycleHelper.clickAddButton();
    StepLogger.verification("Verify Add a Payment Cycle form is displayed.");
    await PaymentCycleHelper.verifyAddPaymentCycleFormDisplayed();

    StepLogger.stepId(3);
    StepLogger.step("Add a Payment Cycle.");
    await PaymentCycleHelper.fillPaymentCycleFormAndClickSaveButton(
      paymentCycle
    );
    StepLogger.verification("Verify the Payment Cycle is displayed.");
    await PaymentCycleHelper.verifyPaymentCycleDisplayed(paymentCycle);
  });
});
