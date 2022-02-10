import { By } from "protractor";
import { HtmlHelper } from "./html-helper";

const { additionalAttributes } = HtmlHelper;

export class HelperElementsPageObjects {
  static get image() {
    return By.css("img");
  }

  static get precedingParent() {
    return By.xpath(
      `(../../preceding-sibling::div[@${additionalAttributes.fullpath}])[last()]`
    );
  }
}
