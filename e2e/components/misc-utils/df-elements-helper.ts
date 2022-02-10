/**
 * This is a decorator function for a web element, pass in an element and get back
 * an extended function element
 * @param locator
 * @param name
 */
import {
  element,
  ElementArrayFinder,
  ElementFinder,
  Locator,
} from "protractor";
import { DropDownHelper } from "../html/dropdown-helper";

import { ElementHelper } from "../html/element-helper";
import { PageHelper } from "../html/page-helper";
import { TextBoxHelper } from "../html/textbox-helper";

import { ExpectationHelper } from "./expectation-helper";
import { IDfElement } from "./i-df-element";
import { IDfElements } from "./i-df-elements";

/**
 * Returns the calling functino using V8 mechanism of populating Error stack.
 *
 * @param level use if util method is used and need to get a caller of a caller (of a caller...)
 */
function getCallingFunction(level = 0) {
  const oldPrepareStackTrace = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    const theStack = new Error().stack as any as NodeJS.CallSite[];
    if (theStack !== null && typeof theStack === "object") {
      // stack[0] holds this file
      // stack[1] holds where this function was called
      // stack[2] holds the file we're interested in
      return theStack[level + 2]
        ? theStack[level + 2].getMethodName()
        : undefined;
    }
  } finally {
    Error.prepareStackTrace = oldPrepareStackTrace;
  }
}

export class DfElement implements IDfElement {
  readonly item: ElementFinder;
  readonly name: string;

  /**
   * @param locator
   * @param name - if the name is not provided, the calling function will be taken
   */
  constructor(locator: Locator | ElementFinder, name?: string) {
    if (locator instanceof ElementFinder) {
      this.item = locator;
    } else {
      /* tslint:disable-next-line:no-element-outside-page-class */
      this.item = element(locator);
    }

    if (name === undefined) {
      this.name = getCallingFunction();
    } else {
      this.name = name;
    }
  }

  /**
   * Click button using JS
   * It logs X button is clicked using subStep
   */
  async clickButtonJs() {
    await ElementHelper.clickButtonJs(this);
  }

  /**
   * Click button
   * It logs X button is clicked using subStep
   */
  async clickButton() {
    await ElementHelper.clickButton(this);
  }

  /**
   * Click link
   * It logs X link is clicked using subStep
   */
  async clickLink() {
    await ElementHelper.clickLink(this);
  }

  /**
   * Click checkbox
   * It logs X checkbox is clicked using subStep
   */
  async clickCheckbox() {
    await ElementHelper.clickCheckbox(this);
  }

  /**
   * Click link
   * It logs X link is clicked using subStep
   */
  async clickLinkJs() {
    await ElementHelper.clickLinkJs(this);
  }

  /**
   * Perform 'Sendkeys' operation
   * It logs sequence of strings passed to the element
   * @param text
   */
  async sendKeys(text: string) {
    await ElementHelper.sendKeys(this, text);
  }

  /**
   * Perform 'Sendkeys' operation
   * It logs sequence of strings passed to the element
   * @param text
   */
  async typeSlowly(text: string) {
    await TextBoxHelper.typeSlowly(this, text, 100);
  }

  /**
   * Schedules a command to clear the value of this element
   */
  async clearText() {
    await TextBoxHelper.clearText(this);
  }

  /**
   * Schedules a command to type a sequence on the DOM element represented by this instance
   * if {value} passed is defined
   * @param text
   */
  async sendKeysIfTextIsDefined(text: string) {
    await ElementHelper.sendKeysIfTextIsDefined(this, text);
  }

  /**
   * Verify whether an element is displayed
   */
  async verifyDisplayedStatus() {
    await ExpectationHelper.verifyDisplayedStatus(this);
  }

  /**
   * Verify whether an element is present
   */
  async verifyPresentStatus() {
    await ExpectationHelper.verifyPresentStatus(this);
  }

  /**
   * Get Css value
   * @param attribute
   */
  async getCssValue(attribute: string): Promise<string> {
    return await PageHelper.getCssValue(this, attribute);
  }

  /**
   * Verify if text value is entered properly
   * @param expected
   */
  async verifyTextEntered(expected: string) {
    await ExpectationHelper.verifyTextEntered(this, expected);
  }

  /**
   * Verify if element has text
   * @param expected
   */
  async verifyElementHasText(expected: string) {
    await ExpectationHelper.verifyText(this, expected);
  }

  /**
   * Perform 'HoverOver' operation using Action class
   */
  async hoverOver() {
    await ElementHelper.actionHoverOver(this);
  }

  /**
   * Perform hoverOver and click using Action class
   */
  async hoverOverAndClick() {
    await this.hoverOver();
    await this.clickButton();
  }

  /**
   * Get text
   */
  async getText(): Promise<string> {
    return await ElementHelper.getText(this);
  }

  /**
   * Check if element is visible
   * @param attribute
   */
  async isVisible() {
    return await ElementHelper.isVisible(this);
  }

  /**
   * Get attribute
   * @param attribute
   */
  async getAttribute(attribute: string): Promise<string> {
    return await ElementHelper.getAttributeValue(this, attribute);
  }

  /**
   * Scroll to element
   */
  async scrollToElement() {
    await ElementHelper.scrollToElement(this);
  }

  /**
   * Verify hidden status
   */
  async verifyHiddenStatus() {
    await ExpectationHelper.verifyHiddenStatus(this);
  }

  /**
   * Verify text box contains {expected} value
   * @param expected
   */
  async verifyTextBoxContains(expected: string) {
    await ExpectationHelper.verifyTextBoxContains(this, expected);
  }

  /**
   * Get currently selected option
   */
  async getSelectedOptionText(): Promise<string> {
    return await DropDownHelper.getSelectedOptionText(this);
  }
}

export class DfElements implements IDfElements {
  readonly item: ElementArrayFinder;

  constructor(locator: Locator, public name: string) {
    this.item = element.all(locator);
  }
}
