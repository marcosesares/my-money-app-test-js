import { By } from "protractor";

import { $ } from "../../../components/misc-utils/selector-aliases";

import { LoginPageConstant } from "./login-page.constants";

const {
  attributes: { selectors, labels },
} = LoginPageConstant;

export class LoginPage {
  static get loginForm() {
    return {
      get loginBoxMsg() {
        return $(By.css(selectors.loginBoxMsg), labels.loginBoxMsg);
      },
      get email() {
        return $(By.name(selectors.email), labels.email);
      },
      get password() {
        return $(By.name(selectors.password), labels.password);
      },
      get logIn() {
        return $(By.xpath(selectors.logIn), labels.logIn);
      },
      get loginLink() {
        return $(By.xpath(selectors.loginLink), labels.loginLink);
      },
    };
  }
}
