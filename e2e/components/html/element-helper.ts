import { browser, by, protractor, ElementFinder } from "protractor";
import { ILocation, ISize } from "selenium-webdriver";

import { StepLogger } from "../../../core/logger/step-logger";
import { Constants } from "../misc-utils/constants";
import { ElementType } from "../misc-utils/element-type";
import { IDfElement } from "../misc-utils/i-df-element";

import { CoreConstants } from "./core-constants";
import { TextBoxHelper } from "./textbox-helper";
import { WaitHelper } from "./wait-helper";

const { DEFAULT_TIMEOUT, TIMEOUTS } = CoreConstants;
const { jsScripts } = Constants;

export class ElementHelper {
  private static readonly EC = protractor.ExpectedConditions;

  /**
   * Get browser name
   */
  static async getBrowser() {
    const capabilities = await browser.getCapabilities();
    return capabilities.get("browserName");
  }

  /**
   * Move mouse with Action class
   * @param target
   */
  static async actionMouseMove(target: IDfElement) {
    StepLogger.subStep(`MouseMove '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return browser.actions().mouseMove(target.item).perform();
  }

  /**
   * Perform Mouse down with Action class
   * @param target
   */
  static async actionMouseDown(target: IDfElement) {
    StepLogger.subStep(`MouseDown '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return browser.actions().mouseDown(target.item).perform();
  }

  /**
   * Sendkeys with Action class
   * @param key
   */
  static async actionSendKeys(key: string) {
    StepLogger.subStep(`Sendkeys '${key}' with Action class`);
    return browser.actions().sendKeys(key).perform();
  }

  /**
   * Perform 'Keyup' operation with Action class
   * @param key
   */
  static async actionKeyUp(key: string) {
    StepLogger.subStep(`KeyUp '${key}' with Action class`);
    return browser.actions().keyUp(key).perform();
  }

  /**
   * Helps in performing 'Mouse up' operation with Action class
   * @param target
   */
  static async actionMouseUp(target?: IDfElement) {
    StepLogger.subStep("Move mouse up");
    if (target) {
      await WaitHelper.waitForElementToBeDisplayed(target.item);
    }
    return browser.actions().mouseUp(target.item.getWebElement()).perform();
  }

  /**
   * Perform 'DragAndDrop' operation with Action class
   * @param source
   * @param destination
   */
  static async actionDragAndDrop(source: IDfElement, destination: IDfElement) {
    StepLogger.subStep(
      `DragAndDrop '${source.name}' to ${destination.name} with Action class`
    );
    await WaitHelper.waitForElement(source.item);
    return browser
      .actions()
      .dragAndDrop(source.item, destination.item)
      .perform();
  }

  /**
   * Perform 'DoubleClick' operation with Action class
   * @param target
   */
  static async actionDoubleClick(target: IDfElement) {
    StepLogger.subStep(`DoubleClick '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return await browser.actions().doubleClick(target.item).perform();
  }

  /**
   * Perform 'Click' operation with Action class
   * @param target
   */
  static async actionClick(target: IDfElement) {
    StepLogger.subStep(`Click '${target.name}' with Action class`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    return await browser.actions().click(target.item).perform();
  }

  /**
   * Perform 'HoverOver' operation with Action class
   * @param target
   */
  static async actionHoverOver(target: IDfElement) {
    StepLogger.subStep(`Hover over '${target.name}'`);
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    await browser.actions().mouseMove(target.item).perform();
  }

  /**
   * Perform 'HoverOverAndClick' operation with Action class
   * @param hoverOverLocator
   * @param clickLocator
   */
  static async actionHoverOverAndClick(
    hoverOverLocator: IDfElement,
    clickLocator = hoverOverLocator
  ) {
    await WaitHelper.waitForElement(hoverOverLocator.item);
    await browser
      .actions()
      .mouseMove(hoverOverLocator.item)
      .click(clickLocator.item)
      .perform();
  }

  /**
   * Get currently focused element
   */
  static async getFocusedElement() {
    StepLogger.subStep("Get FocusedElement");
    return browser.driver.switchTo().activeElement();
  }

  /**
   * Get element location
   * @param target
   */
  static async getLocation(target: IDfElement): Promise<ILocation> {
    StepLogger.subStep(`Get location of '${target.name}'`);
    await WaitHelper.waitForElement(target.item);
    const location = await target.item.getLocation();
    StepLogger.subStep(`Received location: '${JSON.stringify(location)}'`);
    return location;
  }

  /**
   * Get element size
   * @param target
   */
  static async getSize(target: IDfElement): Promise<ISize> {
    StepLogger.subStep(`Get size of '${target.name}'`);
    await WaitHelper.waitForElement(target.item);
    const size = await target.item.getSize();
    StepLogger.subStep(`Received size: '${JSON.stringify(size)}'`);
    return size;
  }

  /**
   * Check if element is visible
   * @param target
   */
  static async isVisible(target: IDfElement) {
    return this.EC.visibilityOf(target.item);
  }

  /**
   * Check if element is not visible
   * @param locator
   */
  static async isNotVisible(locator: IDfElement) {
    return this.EC.invisibilityOf(locator.item);
  }

  /**
   * Check if element is in dom
   * @param locator
   */
  static async inDom(locator: IDfElement) {
    return this.EC.presenceOf(locator.item);
  }

  /**
   * Check if element is not in dom
   * @param locator
   */
  static async notInDom(locator: IDfElement) {
    return this.EC.stalenessOf(locator.item);
  }

  /**
   * Check if element is clickable
   * @param locator
   */
  static async isClickable(locator: IDfElement) {
    return this.EC.elementToBeClickable(locator.item);
  }

  /**
   * Check if element has {text}
   * @param locator
   * @param text
   */
  static async hasText(locator: IDfElement, text: string) {
    return this.EC.textToBePresentInElement(locator.item, text);
  }

  /**
   * Check if element page title is {title}
   * @param title
   */
  static async titleIs(title: string) {
    return this.EC.titleIs(title);
  }

  /**
   * Check if element has {klass} class
   * @param locator
   * @param klass
   */
  static async hasClass(locator: IDfElement, klass: string) {
    const classes = (await locator.item.getAttribute("class")) as string;
    return classes && classes.split(" ").indexOf(klass) !== -1;
  }

  /**
   * Class has regex
   * @param target
   * @param klass
   */
  static async hasClassRegex(target: IDfElement, klass: string) {
    const classAttribute = await target.getAttribute("class");
    return classAttribute.includes(klass);
  }

  /**
   * Perform 'Click' using JS
   * @param targetElement
   */
  static async clickUsingJs(targetElement: IDfElement) {
    await WaitHelper.waitForElementToBeClickable(targetElement.item);
    await this.clickUsingJsNoWait(targetElement);
  }

  /**
   * Perform 'Click' using JS without waiting for element to be clickable
   * @param target
   */
  static async clickUsingJsNoWait(target: IDfElement) {
    await browser.executeScript(
      jsScripts.click,
      await target.item.getWebElement()
    );
  }

  /**
   * Select dropdown by index
   * @param target
   * @param optionNum
   */
  static async selectDropDownByIndex(target: IDfElement, optionNum: number) {
    if (optionNum) {
      const options = await target.item.findElements(by.tagName("option"));
      await options[optionNum].click();
    }
  }

  /**
   * Scroll to element
   * @param target
   */
  static async scrollToElement(target: IDfElement) {
    await browser.executeScript(jsScripts.scrollIntoView, target.item);
  }

  /**
   * Get attribute value
   * @param elem
   * @param attribute
   */
  static async getAttributeValue(
    elem: IDfElement | ElementFinder,
    attribute: string
  ) {
    return await TextBoxHelper.getAttributeValue(elem, attribute);
  }

  /**
   * Get text
   * @param elem
   */
  static async getText(elem: IDfElement) {
    StepLogger.subStep(`Get text of element: '${elem.name}'`);
    await WaitHelper.waitForElementToHaveText(elem.item);
    let text = await elem.item.getText();
    text = text.trim();
    StepLogger.subStep(`Received text: '${text}'`);
    return text;
  }

  /**
   * Open link in new tab
   * @param target
   */
  static async openLinkInNewTabUsingTarget(target: IDfElement) {
    const script =
      'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
    await browser.executeScript(script, await target.item.getWebElement());
  }

  /**
   * Open link in new window
   * @param target
   */
  static async openLinkInNewTabUsingWindowOpener(target: IDfElement) {
    const script =
      'return window.open(arguments[0].getAttribute("href"),"_blank")';
    await browser.executeScript(script, await target.item.getWebElement());
  }

  /**
   * Click 'Button' using JS
   * It logs X button is clicked using subStep
   * @param targetElement
   */
  static async clickButtonJs(targetElement: IDfElement) {
    await this.clickJs(targetElement, ElementType.Button);
  }

  /**
   * Click 'Link' using JS
   * It logs X link is clicked using subStep
   * @param targetElement
   */
  static async clickLinkJs(targetElement: IDfElement) {
    await this.clickJs(targetElement, ElementType.Link);
  }

  /**
   * Click 'Button'
   * It logs X button is clicked using subStep
   * @param targetElement
   */
  static async clickButton(targetElement: IDfElement) {
    await this.click(targetElement, ElementType.Button);
  }

  /**
   * Click 'Link' using JS
   * It logs X link is clicked using subStep
   * @param targetElement
   */
  static async clickLink(targetElement: IDfElement) {
    await this.click(targetElement, ElementType.Link);
  }

  /**
   * Click 'Checkbox' using JS
   * It logs X checkbox is clicked using subStep
   * @param targetElement
   */
  static async clickCheckbox(targetElement: IDfElement) {
    await this.click(targetElement, ElementType.Checkbox);
  }

  /**
   * Click 'RadioButton' using JS
   * It logs X radio-button is clicked using subStep
   * @param targetElement
   */
  static async clickRadioButton(targetElement: IDfElement) {
    await this.click(targetElement, ElementType.RadioButton);
  }

  /**
   * Click element with offset
   * @param targetElement
   * @param offset
   */
  static async clickElementWithOffset(
    targetElement: IDfElement,
    offset: ILocation
  ) {
    StepLogger.subStep(
      `Click '${targetElement.name}' with offset: ${JSON.stringify(offset)}`
    );
    await WaitHelper.waitForElementToBeDisplayed(targetElement.item);
    await browser
      .actions()
      .mouseMove(targetElement.item, offset)
      .click()
      .perform();
  }

  /**
   * Refresh page and click button
   * @param targetElement
   */
  static async refreshAndClickButton(targetElement: IDfElement) {
    await browser.refresh(DEFAULT_TIMEOUT);
    await this.click(targetElement, ElementType.Button);
  }

  /**
   * Wait and click
   * @param targetElement
   * @param wait
   */
  static async waitAndClickButton(
    targetElement: IDfElement,
    wait = TIMEOUTS.xs
  ) {
    await WaitHelper.waitForElementToBeDisplayed(targetElement.item);
    await WaitHelper.sleep(wait);
    try {
      await this.click(targetElement, ElementType.Button);
    } catch (e) {
      await this.clickJs(targetElement, ElementType.Button);
    }
  }

  /**
   * Perform 'MouseMoveAndClick' operation with Action class
   * @param target
   */
  static async actionMouseMoveAndClick(target: IDfElement) {
    await WaitHelper.waitForElement(target.item);
    await browser.actions().mouseMove(target.item.getWebElement()).perform();
    await browser.actions().click().perform();
  }

  /**
   * Perform 'MouseMoveAndClick' operation with Displayed wait using Action class
   * @param target
   */
  static async actionClickWithWait(target: IDfElement) {
    await WaitHelper.waitForElementToBeDisplayed(target.item);
    await this.actionMouseMoveAndClick(target);
  }

  /**
   * Perform 'Senfkeys' operation
   * @param targetElement
   * @param value
   * @param sendEnter
   */
  static async sendKeys(
    targetElement: IDfElement,
    value: string,
    sendEnter = false
  ) {
    StepLogger.subStep(`Enter '${value}' in '${targetElement.name}' textbox`);
    await TextBoxHelper.sendKeys(targetElement, value, sendEnter);
  }

  /**
   * Enter text only passed {value} is defined
   * @param targetElement
   * @param value
   * @param sendEnter
   */
  static async sendKeysIfTextIsDefined(
    targetElement: IDfElement,
    value: string,
    sendEnter = false
  ) {
    if (value) {
      await this.sendKeys(targetElement, value, sendEnter);
    }
  }

  /**
   * Click element by coordinates
   * @param location
   */
  static async clickViaCoordinates(location: ILocation) {
    const script = (x: number, y: number) =>
      `document.elementFromPoint(${x}, ${y}).click();`;
    await browser.driver.executeScript(script(location.x, location.y));
  }

  /**
   * Click using Javascript
   * @param targetElement
   * @param eType
   */
  private static async clickJs(targetElement: IDfElement, eType: ElementType) {
    StepLogger.subStep(`Click '${targetElement.name}' ${eType}`);
    await this.clickUsingJs(targetElement);
  }

  /**
   * Perform click
   * @param targetElement
   * @param eType
   */
  private static async click(targetElement: IDfElement, eType: ElementType) {
    StepLogger.subStep(`Click '${targetElement.name}' ${eType}`);
    await WaitHelper.waitForElementToBeClickable(targetElement.item);
    return await targetElement.item.click();
  }
}
