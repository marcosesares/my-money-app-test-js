import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../components/html/page-helper";
import { LoginPageHelper } from "../../../page-objects/pages/login-page/login-page.helper";
import { SuiteNames } from "../../helpers/suite-names";
import { CommonPageHelper } from "./../../../page-objects/pages/common/common-page.helper";
import { CoreConstants } from "./../../../components/html/core-constants";
import { SignUpPageHelper } from "./../../../page-objects/pages/signup-page/signup-page.helper";
import { DashboardPageHelper } from "../../../page-objects/pages/dashboard-page/dashboard-page.helper";
import faker from "@faker-js/faker";

describe(SuiteNames.healthCheckSuite, () => {
  let loginPageHelper: LoginPageHelper;

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

  it("User Open My Money App and Sign up to application. - [1002]", async () => {
    let user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: `${faker.helpers.replaceSymbols(CoreConstants.PASSWORD_REGEX)}`,
    };
    StepLogger.caseId = 1002;
    StepLogger.stepId(1);
    StepLogger.step("User signs up to My Money App.");
    await SignUpPageHelper.fillSignUpFormAndClickRegisterButton(user);
    StepLogger.verification("Verify Dashboard is displayed.");
    await DashboardPageHelper.verifyDashboardSectionDisplayedStatus();
  });
});
