import { By } from "protractor";

import { $ } from "../../../components/misc-utils/selector-aliases";

import { DashboardPageConstant } from "./dashboard-page.constants";

const {
  attributes: { selectors, labels },
} = DashboardPageConstant;

export class DashboardPage {
  static get mainSection() {
    return {
      get totalCreditsValue() {
        return $(
          By.xpath(selectors.totalCreditsValue),
          labels.totalCreditsValue
        );
      },
      get totalDebitsValue() {
        return $(By.xpath(selectors.totalDebitsValue), labels.totalDebitsValue);
      },
      get consolidatedValue() {
        return $(
          By.xpath(selectors.consolidatedValue),
          labels.consolidatedValue
        );
      },
      get totalCredits() {
        return $(By.xpath(selectors.totalCredits), labels.totalCredits);
      },
      get totalDebits() {
        return $(By.xpath(selectors.totalDebits), labels.totalDebits);
      },
      get consolidated() {
        return $(By.xpath(selectors.consolidated), labels.consolidated);
      },
    };
  }
}
