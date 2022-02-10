import { IDfElement } from "./i-df-element";

export class ValidationsHelper {
  static get types() {
    return {
      field: "Field",
      dropDown: "Drop down",
      page: "Page",
      button: "Button",
      label: "Label",
      image: "Image",
      window: "Window",
      notification: "Notification",
      grid: "Grid",
      alert: "Alert",
      menu: "Menu",
      link: "Link",
    };
  }

  static getOnlyOneRecordShouldBeDisplayed(type: string, title: string) {
    return `There should only be 1 record displayed in ${type} with title ${title}`;
  }

  static getFieldShouldHaveValueValidation(
    fieldLabel: string,
    value: string,
    name: string
  ) {
    return this.getFieldValueValidation(fieldLabel, value, name);
  }

  static getFieldShouldNotHaveValueValidation(
    fieldLabel: string,
    value: string
  ) {
    return this.getFieldValueValidation(fieldLabel, value, "not");
  }

  static getFieldValueValidation(
    fieldLabel: string,
    value: string,
    status: string
  ) {
    return `${this.types.field} ${fieldLabel} should ${status} have value as ${value}`;
  }

  static getFieldEqualValidation(
    fieldLabel: string,
    actual: string,
    expected: string
  ) {
    return `${this.types.field} ${fieldLabel}: ${actual} should be equal to ${expected}`;
  }

  static getFieldNotEqualValidation(
    fieldLabel: string,
    actual: string,
    expected: string
  ) {
    return `${this.types.field} ${fieldLabel}: ${actual} should not be equal to ${expected}`;
  }

  static getNoOptionDisplayed(fieldLabel: string) {
    return `${this.types.dropDown} ${fieldLabel} should not have any option displayed`;
  }

  static getOptionDisplayed(fieldLabel: string, optionLabel: string) {
    return `${this.types.dropDown} ${fieldLabel} should display option with text ${optionLabel}`;
  }

  static getFieldAttributeValidation(
    fieldLabel: string,
    attribute: string,
    value: string
  ) {
    return `${this.types.field} ${fieldLabel}: Attribute: ${attribute} should be equal to ${value}`;
  }

  static getFieldAttributePresentValidation(
    fieldLabel: string,
    attribute: string
  ) {
    return `${this.types.field} ${fieldLabel}: Attribute: ${attribute} should be present`;
  }

  static getFieldAttributeNotPresentValidation(
    fieldLabel: string,
    attribute: string
  ) {
    return `${this.types.field} ${fieldLabel}: Attribute: ${attribute} should not be present`;
  }

  static getFieldAttributeContainsValueValidation(
    fieldLabel: string,
    attribute: string,
    value: string
  ) {
    return `${this.types.field} ${fieldLabel}: Attribute: ${attribute} should contain ${value}`;
  }

  static getFieldAttributeNotContainsValidation(
    fieldLabel: string,
    attribute: string,
    value: string
  ) {
    return `${this.types.field} ${fieldLabel}: Attribute: ${attribute} should not contain ${value}`;
  }

  static getFieldNotAttributeValidation(
    fieldLabel: string,
    attribute: string,
    value: string
  ) {
    return `${this.types.field} ${fieldLabel}: Attribute: ${attribute} should not be equal to ${value}`;
  }

  static getPageDisplayedValidation(name: string) {
    return `${this.types.page} ${this.getDisplayedValidation(name)}`;
  }

  static getFieldDisplayedValidation(name: string) {
    return `${this.types.field} ${this.getDisplayedValidation(name)}`;
  }

  static getButtonDisplayedValidation(name: string) {
    return `${this.types.button} ${this.getDisplayedValidation(name)}`;
  }

  static getButtonDisabledValidation(name: string) {
    return `${this.types.button} ${this.getDisabledValidation(name)}`;
  }

  static getMenuDisplayedValidation(name: string) {
    return `${this.types.menu} ${this.getDisplayedValidation(name)}`;
  }

  static getMenuShouldNotBeDisplayedValidation(name: string) {
    return `${this.types.menu} ${this.getNotDisplayedValidation(name)}`;
  }

  static getMenuIsUnderParentValidation(menuName: string, parentName: string) {
    return `Verify that ${menuName} is under ${parentName}`;
  }

  static getMenuExpandedValidation(name: string) {
    return `${this.types.menu} ${name} should be expanded`;
  }

  static getMenuCollapsedValidation(name: string) {
    return `${this.types.menu} ${name} should be shrinked`;
  }

  static getMenuShouldNotHaveChildValidation(name: string) {
    return `${this.types.menu} "${name}" should not have children`;
  }

  static getLabelDisplayedValidation(name: string) {
    return `${this.types.label} '${this.getDisplayedValidation(name)}'`;
  }

  static getImageDisplayedValidation(name: string) {
    return `${this.types.image} '${this.getDisplayedValidation(name)}'`;
  }

  static getGridDisplayedValidation(name: string) {
    return `${this.types.grid} ${this.getDisplayedValidation(name)}`;
  }

  static getDeletionConfirmationDisplayedValidation(recordText: string) {
    return `Confirmation box for deletion of record which contains ${this.getDisplayedValidation(
      recordText
    )}`;
  }

  static getRecordCreatedValidation(recordText: string[]) {
    return this.getRecordContainsMessage(
      this.getDisplayedValidation(recordText.join(","))
    );
  }

  static getRecordDeletedValidation(recordText: string) {
    return this.getRecordContainsMessage(`${recordText} has been deleted`);
  }

  static getRecordContainsMessage(message: string) {
    return `Record which contains ${message}`;
  }

  static getDisplayedValidation(name: string) {
    return `'${name}' should be displayed`;
  }

  static getSortedValidation(order: string, name: string) {
    return `Column ${name} must be sorted in ${order} order`;
  }

  static getAscendingSortedValidation(name: string) {
    return this.getSortedValidation(name, "ascending");
  }

  static getDescendingSortedValidation(name: string) {
    return this.getSortedValidation(name, "descending");
  }

  static getDisabledValidation(name: string) {
    return `${name} should be disabled`;
  }

  static getEnabledValidation(name: string) {
    return `${name} should be enabled`;
  }

  static getEnabledButtonValidation(name: string) {
    return `${name} should be enabled`;
  }

  static getNotEnabledButtonValidation(name: string) {
    return `${name} should not be enabled`;
  }

  static getDisabledButtonValidation(name: string) {
    return `${name} should be disabled`;
  }

  static getErrorDisplayedValidation(error: string) {
    return `Error ${this.getDisplayedValidation(error)}`;
  }

  static getErrorDisplayedValidationForField(field: string, error: string) {
    return `Error ${this.getDisplayedValidation(error)} for field ${field}`;
  }

  static getWindowShouldNotBeDisplayedValidation(name: string) {
    return `${this.types.window} ${this.getNotDisplayedValidation(name)}`;
  }

  static getNotificationDisplayedValidation(name: string) {
    return `${this.types.notification} ${this.getDisplayedValidation(name)}`;
  }

  static getHttpStatusCodeValidation(statusCode: any) {
    return `Http response code should be ${statusCode}`;
  }

  static getHttpResponseBodyValidation(content: string) {
    return `Http response body should contain ${content}`;
  }

  static getNotDisplayedValidation(name: string) {
    return `${name} should not be displayed`;
  }

  static getOnlyOneRecordShouldBeDisplayedInGrid(name: string) {
    return this.getOnlyOneRecordShouldBeDisplayed(this.types.dropDown, name);
  }

  static getOnlyOneRecordShouldBeDisplayedInDropDown(name: string) {
    return this.getOnlyOneRecordShouldBeDisplayed(this.types.grid, name);
  }

  static getMessageDisplayedValidation(msg: string) {
    return `Message ${this.getDisplayedValidation(msg)}`;
  }

  static getLinkDisplayedValidation(name: string) {
    return `${this.types.link} ${this.getDisplayedValidation(name)}`;
  }

  static getLinkNotDisplayedValidation(name: string) {
    return `${this.types.link} ${this.getNotDisplayedValidation(name)}`;
  }

  static getCheckedValidation(name: string) {
    return `${name} should be checked`;
  }

  static getElementDisplayedValidation(name: string) {
    return `${name} element should be displayed`;
  }

  static getIconDisplayedValidation(name: string) {
    return `Icon ${this.getDisplayedValidation(name)}`;
  }

  static getIconNotDisplayedValidation(name: string) {
    return `Icon ${this.getNotDisplayedValidation(name)}`;
  }

  static getFieldHasValueValidation(fieldLabel: string, value: string) {
    return `Field ${fieldLabel} has value as ${value}`;
  }

  static getFieldDoesNotHaveValueValidation(fieldLabel: string, value: string) {
    return `Field ${fieldLabel} does not have value as ${value}`;
  }

  static getAlertHasMessage(message: string) {
    return `Alert box has message ${message}`;
  }

  static getPresentValidation(name: string) {
    return `${name} should be present`;
  }

  static getAbsentValidation(name: string) {
    return `${name} should be absent`;
  }

  static getNotPresentValidation(name: string) {
    return `${name} should not be present`;
  }

  static getSelectedValidation(name: string) {
    return `${name} should be selected`;
  }

  static getUnSelectedValidation(name: string) {
    return `${name} should be unselected`;
  }

  static getGreaterThanValidation(
    actualValue: number,
    expectedValue: number,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should be grater than ${expectedValue}`;
  }

  static getLessThanOrEqualToValidation(
    actualValue: number,
    expectedValue: number,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should be less than or equal ${expectedValue}`;
  }

  static getGreaterThanOrEqualToValidation(
    actualValue: number,
    expectedValue: number,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should be greater than or equal ${expectedValue}`;
  }

  static getEqualityValidation(
    actualValue: string,
    expectedValue: string,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should be equal to ${expectedValue}`;
  }

  static getInEqualityValidation(
    actualValue: string,
    expectedValue: string,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should be not be equal to ${expectedValue}`;
  }

  static getFieldContainsValidation(
    actualValue: string,
    expectedValue: string,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should contain ${expectedValue}`;
  }

  static getFieldNotContainsValidation(
    actualValue: string,
    expectedValue: string,
    elementName: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should not contain ${expectedValue}`;
  }

  static getHiddenValidation(name: string) {
    return `${name} should be hidden`;
  }

  static getTabsToHaveCount(count: number) {
    return `Wait until tabs to have count: ${count}`;
  }

  static getStringToContain(
    elementName: string,
    actualValue: string,
    expectedValue: string
  ) {
    return `Field name - ${elementName} : ${actualValue} should contain ${expectedValue}`;
  }

  static getLessThanValidation(actualValue: number, expectedValue: number) {
    return `${actualValue} should be less than ${expectedValue}`;
  }

  static getDropdownValueShouldBe(
    selectElement: IDfElement,
    actualValue: string
  ) {
    return `'${selectElement.name}' dropdown should have '${actualValue}' value`;
  }
}
