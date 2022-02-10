import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../components/html/page-helper";
import { CredentialsHelper } from "../../../components/misc-utils/credentials-helper";
import { CommonPageHelper } from "../../../page-objects/pages/common/common-page.helper";
import { DashboardPageHelper } from "../../../page-objects/pages/dashboard-page/dashboard-page.helper";
import { LoginPageHelper } from "../../../page-objects/pages/login-page/login-page.helper";
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

  it("Dashboard Consolidated value check. - [1003]", async () => {
    StepLogger.caseId = 1003;
    StepLogger.stepId(1);
    StepLogger.step("Dashboard Consolidated value check.");
    StepLogger.verification("Verify Total Credits Label is displayed.");
    await DashboardPageHelper.verifyTotalCreditsLabelText();
    StepLogger.verification("Verify Total Debits Label is displayed.");
    await DashboardPageHelper.verifyTotalDebitsLabelText();
    StepLogger.verification("Verify Consolidated Label is displayed.");
    await DashboardPageHelper.verifyConsolidatedLabelText();
    StepLogger.verification("Verify Consolidated value is correct.");
    await DashboardPageHelper.verifyConsolidatedValue();
  });
});
