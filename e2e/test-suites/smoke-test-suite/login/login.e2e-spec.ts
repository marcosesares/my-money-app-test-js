import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../components/html/page-helper";
import { CredentialsHelper } from "../../../components/misc-utils/credentials-helper";
import { CommonPageHelper } from "../../../page-objects/pages/common/common-page.helper";
import { LoginPageHelper } from "../../../page-objects/pages/login-page/login-page.helper";
import { SuiteNames } from "../../helpers/suite-names";

describe(SuiteNames.smokeSuite, () => {
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
  });

  it("Open My Money App and login to application. - [1001]", async () => {
    StepLogger.caseId = 1001;
    StepLogger.stepId(1);
    StepLogger.step("Enter Login information and click the Login button.");
    await LoginPageHelper.fillLoginFormAndClickLoginButton(mcesar);
    StepLogger.verification("Verify My Money App logo is displayed.");
    await LoginPageHelper.verifyUserLoggedIn();
  });
});
