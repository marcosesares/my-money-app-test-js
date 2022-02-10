import { by, By } from 'protractor';

import { DropdownField } from '../../page-objects/pages/models/dropdown-field';
import { HtmlHelper } from '../misc-utils/html-helper';
import { IDfElement } from '../misc-utils/i-df-element';
import { IDfElements } from '../misc-utils/i-df-elements';
// tslint:disable:no-circular-imports Very difficult to avoid
import { $, $$ } from '../misc-utils/selector-aliases';

import { WaitHelper } from './wait-helper';

// Helper class needs to interact with elements outside po file
/* tslint:disable:no-element-outside-page-class */
export class DropDownHelper {

    private static readonly byRegex = /^By\\(.+, (.+)\\)$/;

    static getXPathForOptionValue(optionVal: string) {
        return `//option[normalize-space(.)="${optionVal}"]`;
    }

    static getCssForOptionValue(optionVal: string) {
        return `option[value="${optionVal}"]`;
    }

    static async selectOptionByText(target: IDfElement, optionVal: string) {
        return target.item.element(By.xpath(this.getXPathForOptionValue(optionVal))).click();
    }

    static getDropdownOptions(target: IDfElements) {
        return target.item.all(By.tagName(HtmlHelper.tags.option));
    }

    static getLocatorValue(target: IDfElement): string {
        return this.byRegex.exec(target.item.locator())[1];
    }

    static getDropdownOptionsByText(target: IDfElement, text: string | RegExp): IDfElements {
        return $$(by.cssContainingText(`${DropDownHelper.getLocatorValue(target)} ${HtmlHelper.tags.option}`,
            text), text.toString());
    }

    static getDropdownOptionByCssText(target: IDfElement, text: string | RegExp): IDfElement {
        return $(by.cssContainingText(`${DropDownHelper.getLocatorValue(target)} ${HtmlHelper.tags.option}`,
            text), text.toString());
    }

    static async selectNthOptionByCss(target: IDfElement, index: number) {
        const elements = DropDownHelper.getDropdownOptionsByText(target, /\w+/).item;
        await WaitHelper.waitUntilElementsCountIsGreaterOrEqual(elements, index + 1);
        await elements.get(index).click();
    }

    static async selectOptionByCssText(target: IDfElement, text: string) {
        const ele = DropDownHelper.getDropdownOptionByCssText(target, text).item;
        await WaitHelper.waitForElementToBeDisplayed(ele);
        await ele.click();
    }

    static async selectSpecificOrNthOptionByCss(target: IDfElement,
                                                { text, index }: DropdownField) {
        if (text) {
            await this.selectOptionByCssText(target, text);
        } else {
            await this.selectNthOptionByCss(target, index);
        }
    }

    static getSelectedOptionText(target: IDfElement) {
        return target.item.element(By.css('option:checked')).getText();
    }

}
