import { By } from "protractor";

import { $ } from "../../../components/misc-utils/selector-aliases";

import { SignUpPageConstant } from "./signup-page.constants";

const {
  attributes: { selectors, labels },
} = SignUpPageConstant;

export class SignUpPage {
  static get form() {
    return {
      get confirmPassword() {
        return $(By.css(selectors.confirmPassword), labels.confirmPassword);
      },
      get register() {
        return $(By.xpath(selectors.register), labels.register);
      },
      get signUpLink() {
        return $(By.xpath(selectors.signUpLink), labels.signUpLink);
      },
      get name() {
        return $(By.css(selectors.name), labels.name);
      },
    };
  }
}
