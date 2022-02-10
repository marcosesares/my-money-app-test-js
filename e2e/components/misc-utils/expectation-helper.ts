import { ElementFinder } from "protractor";

import { StepLogger } from "../../../core/logger/step-logger";
import { DropdownField } from "../../page-objects/pages/models/dropdown-field";
import { AlertHelper } from "../html/alert-helper";
import { CheckboxHelper } from "../html/checkbox-helper";
import { DropDownHelper } from "../html/dropdown-helper";
import { ElementHelper } from "../html/element-helper";
import { PageHelper } from "../html/page-helper";
import { TextBoxHelper } from "../html/textbox-helper";
import { WaitHelper } from "../html/wait-helper";

import { Constants } from "./constants";
import { HelperElementsPageObjects } from "./helper-elements.po";
import { HtmlHelper } from "./html-helper";
import { IDfElement } from "./i-df-element";
import { ValidationsHelper } from "./validation-helper";

const { precedingParent } = HelperElementsPageObjects;
const { attributes, additionalAttributes, commonClasses } = HtmlHelper;

export class ExpectationHelper {
  static async verifyAlertMessageAbsent() {
    const alertMessage = ValidationsHelper.getAbsentValidation(
      ValidationsHelper.types.alert
    );
    StepLogger.subVerification(alertMessage);
    await expect(await AlertHelper.isAlertPresent()).toBe(false, alertMessage);
  }

  static async verifyAlertMessage(message: string) {
    const alertMessage = ValidationsHelper.getAlertHasMessage(message);
    StepLogger.subVerification(alertMessage);
    await expect(await AlertHelper.getAlertText()).toBe(message, alertMessage);
  }

  static async verifyTreeNodeMenuIsUnderParent(
    targetElement: IDfElement,
    parentName: string
  ) {
    const message = ValidationsHelper.getMenuIsUnderParentValidation(
      targetElement.name,
      parentName
    );
    StepLogger.subVerification(message);
    await expect(
      await ElementHelper.getAttributeValue(
        targetElement,
        additionalAttributes.container
      )
    ).toBe(parentName, message);
  }

  static async verifyChildMenuIsUnderTreeNode(
    targetElement: IDfElement,
    parentName: string
  ) {
    const message = ValidationsHelper.getMenuIsUnderParentValidation(
      targetElement.name,
      parentName
    );
    StepLogger.subVerification(message);

    // tslint:disable:no-element-outside-page-class
    // no selector available other than going two level up using ../../
    await expect(
      await targetElement.item
        .element(precedingParent)
        .getAttribute(additionalAttributes.fullpath)
    ).toBe(parentName, message);
  }

  /**
   * Verify whether an element is displayed or not
   * @param targetElement
   */
  static async verifyDisplayedStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getDisplayedValidation(
      targetElement.name
    );
    StepLogger.subVerification(message);
    await expect(
      await WaitHelper.waitForElementToBeDisplayed(targetElement.item)
    ).toBe(true, message);
  }

  /**
   * Verify if an element is hidden
   * @param targetElement
   */
  static async verifyHiddenStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getNotDisplayedValidation(
      targetElement.name
    );
    StepLogger.subVerification(message);
    await expect(
      await WaitHelper.waitForElementToBeHidden(targetElement.item)
    ).toBe(true, message);
  }

  /**
   * Verify whether an element is present or not
   * @param targetElement
   */
  static async verifyPresentStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getPresentValidation(targetElement.name);
    StepLogger.subVerification(message);
    await expect(await WaitHelper.waitForElement(targetElement.item)).toBe(
      true,
      message
    );
  }

  /**
   * Verify element is not displayed
   * @param targetElement
   */
  static async verifyNotDisplayedStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getNotDisplayedValidation(
      targetElement.name
    );
    StepLogger.subVerification(message);
    await expect(
      await WaitHelper.waitForElementToBeHidden(targetElement.item)
    ).toBe(true, message);
  }

  /**
   * Verify if checkbox is checked
   * @param targetElement
   */
  static async verifyCheckboxIsChecked(targetElement: IDfElement) {
    const message = ValidationsHelper.getNotDisplayedValidation(
      targetElement.name
    );
    StepLogger.subVerification(message);
    const checkBoxStatus = await CheckboxHelper.isCheckboxChecked(
      targetElement
    );
    await expect(checkBoxStatus).toBe(true, message);
  }

  /**
   * Verify whether an element is removed from the page
   * @param targetElement
   */
  static async verifyRemovedStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getNotDisplayedValidation(
      targetElement.name
    );
    StepLogger.subVerification(message);
    await expect(
      await WaitHelper.waitForElementToBeHidden(targetElement.item)
    ).toBe(true, message);
  }

  /**
   * Verify whether an element is enabled or not
   * @param targetElement
   */
  static async verifyEnabledStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getEnabledValidation(targetElement.name);
    StepLogger.subVerification(message);
    await expect(
      await WaitHelper.waitForElementToBeEnabled(targetElement.item)
    ).toBe(true, message);
  }

  /**
   * Verify whether an element is selected or not
   * @param targetElement
   */
  static async verifySelectedStatus(targetElement: IDfElement) {
    const message = ValidationsHelper.getSelectedValidation(targetElement.name);
    StepLogger.subVerification(message);
    await expect(
      await WaitHelper.waitForElementToBeSelected(targetElement.item)
    ).toBe(true, message);
  }

  /**
   * Verify that TextBox contains {expected} text
   * @param targetElement
   * @param expected
   */
  static async verifyTextBoxContains(
    targetElement: IDfElement,
    expected: string
  ) {
    const actual = await targetElement.getText();
    const message = ValidationsHelper.getStringToContain(
      targetElement.name,
      actual,
      expected
    );
    StepLogger.subVerification(message);
    await expect(actual).toContain(expected, message);
  }

  /**
   * Verify that element has the exact text ignore casing
   * @param targetElement
   * @param expectedValue
   */
  static async verifyTextIgnoreCase(
    targetElement: IDfElement,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldShouldHaveValueValidation(
      targetElement.name,
      additionalAttributes.text,
      expectedValue
    );
    StepLogger.subVerification(message);
    await expect(
      (await ElementHelper.getText(targetElement)).toLowerCase()
    ).toBe(expectedValue.toLowerCase(), message);
  }

  /**
   * Verify that element has the exact text ignore casing
   * @param targetElement
   * @param expectedValue
   */
  static async verifyText(targetElement: IDfElement, expectedValue: string) {
    const message = ValidationsHelper.getFieldShouldHaveValueValidation(
      targetElement.name,
      additionalAttributes.text,
      expectedValue
    );
    StepLogger.subVerification(message);
    await expect(await ElementHelper.getText(targetElement)).toBe(
      expectedValue,
      message
    );
  }

  /**
   * Verify that textbox element's 'value' attribute has same text
   * @param targetElement
   * @param expectedValue
   */
  static async verifyValue(targetElement: IDfElement, expectedValue: string) {
    const message = ValidationsHelper.getFieldShouldHaveValueValidation(
      targetElement.name,
      attributes.value,
      expectedValue
    );
    StepLogger.subVerification(message);
    await expect(
      await TextBoxHelper.hasValue(targetElement, expectedValue)
    ).toBe(true, message);
  }

  /**
   * Verify that element contains the text
   * @param targetElement
   * @param expectedText
   */
  static async verifyTextContains(
    targetElement: IDfElement,
    expectedText: string
  ) {
    const actualText = await ElementHelper.getText(targetElement);
    const message = ValidationsHelper.getStringToContain(
      targetElement.name,
      actualText,
      expectedText
    );

    StepLogger.subVerification(message);
    await expect(actualText).toContain(expectedText, message);
  }

  /**
   * Verify that value is grater than other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyValueGraterThan(
    target: IDfElement,
    actualValue: number,
    expectedValue: number
  ) {
    const message = ValidationsHelper.getGreaterThanValidation(
      actualValue,
      expectedValue,
      target.name
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toBeGreaterThan(expectedValue, message);
  }

  /**
   * Verify that value is less than or equal to other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyValueLessOrEqualTo(
    target: IDfElement,
    actualValue: number,
    expectedValue: number
  ) {
    const message = ValidationsHelper.getLessThanOrEqualToValidation(
      actualValue,
      expectedValue,
      target.name
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toBeLessThanOrEqual(expectedValue, message);
  }

  /**
   * Verify that value is less than the other value
   * @param actualValue
   * @param expectedValue
   */
  static async verifyValueLessThan(actualValue: number, expectedValue: number) {
    const message = ValidationsHelper.getLessThanValidation(
      actualValue,
      expectedValue
    );
    StepLogger.subVerification(
      `${actualValue} should be less than ${expectedValue} value`
    );
    await expect(actualValue).toBeLessThan(expectedValue, message);
  }

  /**
   * Verify that value is equal to other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyNumberValueEqualTo(
    target: IDfElement,
    actualValue: number,
    expectedValue: number
  ) {
    const message = ValidationsHelper.getFieldEqualValidation(
      target.name,
      String(actualValue),
      String(expectedValue)
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toEqual(expectedValue, message);
  }

  /**
   * Verify that value is greater than or equal to other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyValueGreaterOrEqualTo(
    target: IDfElement,
    actualValue: number,
    expectedValue: number
  ) {
    const message = ValidationsHelper.getGreaterThanOrEqualToValidation(
      actualValue,
      expectedValue,
      target.name
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toBeGreaterThanOrEqual(expectedValue, message);
  }

  /**
   * Verify that value is not equal to other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyValueNotEqualTo(
    target: IDfElement,
    actualValue: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldNotEqualValidation(
      target.name,
      actualValue,
      expectedValue
    );
    StepLogger.subVerification(message);
    await expect(actualValue).not.toEqual(expectedValue, message);
  }

  /**
   * Verify that checkbox is not checked
   * @param targetElement
   */
  static async verifyCheckBoxNotSelected(targetElement: IDfElement) {
    const message = ValidationsHelper.getUnSelectedValidation(
      targetElement.name
    );
    await WaitHelper.waitForElement(targetElement.item);
    const actualValue = await targetElement.item.isSelected();

    StepLogger.subVerification(message);
    await expect(actualValue).toEqual(false, message);
  }

  /**
   * Verify that attribute values is equal to expected Value
   * @param targetElement
   * @param attribute
   * @param expected
   */
  static async verifyAttributeValue(
    targetElement: IDfElement,
    attribute: string,
    expected: string
  ) {
    const message = ValidationsHelper.getFieldAttributeValidation(
      targetElement.name,
      attribute,
      expected
    );
    const actualValue = await ElementHelper.getAttributeValue(
      targetElement,
      attribute
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toEqual(expected, message);
  }

  /**
   * Verify that attribute values is not equal to expected Value
   * @param targetElement
   * @param attribute
   * @param expectedValue
   */
  static async verifyAttributeValueNotToBe(
    targetElement: IDfElement,
    attribute: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldNotAttributeValidation(
      targetElement.name,
      attribute,
      expectedValue
    );
    const actualValue = await ElementHelper.getAttributeValue(
      targetElement,
      attribute
    );
    StepLogger.subVerification(message);
    await expect(actualValue).not.toBe(expectedValue, message);
  }

  /**
   * Verify that string value is equal to other value
   * @param targetElement
   * @param actualValue
   * @param expectedValue
   */
  static async verifyStringValueEqualTo(
    targetElement: IDfElement,
    actualValue: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldEqualValidation(
      targetElement.name,
      actualValue,
      expectedValue
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toEqual(expectedValue, message);
  }

  /**
   * Verify that string value contains the other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyStringValueContain(
    target: IDfElement,
    actualValue: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldContainsValidation(
      actualValue,
      expectedValue,
      target.name
    );
    StepLogger.subVerification(message);
    await expect(actualValue).toContain(expectedValue, message);
  }

  /**
   * Verify that string value to not contain the other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyStringValueNotContain(
    target: IDfElement,
    actualValue: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldNotContainsValidation(
      actualValue,
      expectedValue,
      target.name
    );
    StepLogger.subVerification(message);
    await expect(actualValue).not.toContain(expectedValue, message);
  }

  /**
   * Verify that string value is not equal to other value
   * @param target
   * @param actualValue
   * @param expectedValue
   */
  static async verifyStringValueNotEqualTo(
    target: IDfElement,
    actualValue: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldNotEqualValidation(
      target.name,
      actualValue,
      expectedValue
    );
    StepLogger.subVerification(
      `${actualValue} should be equal to  ${expectedValue} value`
    );
    await expect(actualValue).not.toBe(expectedValue, message);
  }

  /**
   * Verify that CSS value is equal to expected Value
   * @param target
   * @param attribute
   * @param expectedValue
   */
  static async verifyCssAttributeValue(
    target: IDfElement,
    attribute: string,
    expectedValue: string
  ) {
    const message = ValidationsHelper.getFieldAttributeValidation(
      target.name,
      attribute,
      expectedValue
    );

    const actualValue = await PageHelper.getCssValue(target, attribute);
    StepLogger.subVerification(message);
    await expect(actualValue).toEqual(expectedValue, message);
  }

  /**
   * Verify that element is highlighted
   * @param targetElement
   * @param attribute
   * @param expected
   */
  static async verifyLinkHighlighted(targetElement: ElementFinder) {
    const message = ValidationsHelper.getFieldAttributeContainsValueValidation(
      targetElement.name,
      attributes.class,
      commonClasses.clsTreeLeafMouseOver
    );
    const actualValue = await ElementHelper.getAttributeValue(
      targetElement,
      attributes.class
    );

    StepLogger.subVerification(message);
    await expect(actualValue).toContain(
      commonClasses.clsTreeLeafMouseOver,
      message
    );
  }

  /**
   * Verify that element's attribute contains {expected} value
   * @param targetElement
   * @param attribute
   * @param expected
   */
  static async verifyAttributeContains(
    targetElement: IDfElement,
    attribute: string,
    expected: string
  ) {
    const message = ValidationsHelper.getFieldAttributeContainsValueValidation(
      targetElement.name,
      attribute,
      expected
    );
    const actualValue = await ElementHelper.getAttributeValue(
      targetElement,
      attribute
    );

    StepLogger.subVerification(message);
    await expect(actualValue).toContain(expected, message);
  }

  /**
   * Verify that element's attribute does not contain {expected} value
   * @param target
   * @param attribute
   * @param expected
   */
  static async verifyAttributeNotContains(
    target: IDfElement,
    attribute: string,
    expected: string
  ) {
    const message = ValidationsHelper.getFieldAttributeNotContainsValidation(
      target.name,
      attribute,
      expected
    );
    const actualValue = await ElementHelper.getAttributeValue(
      target,
      attribute
    );
    StepLogger.subVerification(message);
    await expect(actualValue).not.toContain(expected, message);
  }

  /**
   * Verify that element's attribute is present
   * @param target
   * @param attribute
   */
  static async verifyAttributePresent(target: IDfElement, attribute: string) {
    const message = ValidationsHelper.getFieldAttributePresentValidation(
      target.name,
      attribute
    );
    StepLogger.subVerification(message);
    const attr = await target.getAttribute(attribute);
    await expect(attr).toBeDefined(message);
  }

  /**
   * Verify that element's attribute is not present
   * @param target
   * @param attribute
   */
  static async verifyAttributeNotPresent(
    target: IDfElement,
    attribute: string
  ) {
    const message = ValidationsHelper.getFieldAttributeNotPresentValidation(
      target.name,
      attribute
    );
    StepLogger.subVerification(message);
    await expect(await target.getAttribute(attribute)).toBeUndefined(message);
  }

  /**
   * Verify 'value' attribute of Dropdown option
   * @param selectElement
   * @param text
   * @param index
   */
  static async verifyValueAttributeOfDropdownOption(
    selectElement: IDfElement,
    { text, index }: DropdownField
  ) {
    let actualValue = Constants.EMPTY_STRING;
    if (text) {
      actualValue = await DropDownHelper.getDropdownOptionByCssText(
        selectElement,
        text
      ).getAttribute(attributes.value);
      StepLogger.subVerification(
        ValidationsHelper.getDropdownValueShouldBe(selectElement, actualValue)
      );
    } else {
      const elements = DropDownHelper.getDropdownOptionsByText(
        selectElement,
        /\w+/
      ).item;
      await WaitHelper.waitUntilElementsCountIsGreaterOrEqual(elements, 1);
      actualValue = await elements.get(index).getAttribute(attributes.value);
      StepLogger.subVerification(
        ValidationsHelper.getDropdownValueShouldBe(selectElement, actualValue)
      );
    }
    const expectedValue = await selectElement.getAttribute(attributes.value);
    await ExpectationHelper.verifyStringValueEqualTo(
      selectElement,
      actualValue,
      expectedValue
    );
  }

  static async verifyTextEntered(target: IDfElement, value: string) {
    const actual = await target.getAttribute(HtmlHelper.attributes.value);
    await ExpectationHelper.verifyStringValueEqualTo(target, actual, value);
  }
}
