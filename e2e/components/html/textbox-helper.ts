import { browser, protractor, ElementFinder } from 'protractor';

import { VerboseLogger } from '../../../core/logger/verbose-logger';
import { HtmlHelper } from '../misc-utils/html-helper';
import { IDfElement } from '../misc-utils/i-df-element';

import { WaitHelper } from './wait-helper';

export class TextBoxHelper {
    /**
     * Clears the existing text from an input elements
     * @param {ElementFinder} target
     */
    static async clearText(target: IDfElement) {
        let ctrl = protractor.Key.CONTROL;

        if (browser.platform && browser.platform.indexOf('Mac')) {
            ctrl = protractor.Key.COMMAND;
        }
        const command = protractor.Key.chord(ctrl, 'a') + protractor.Key.BACK_SPACE;
        await target.item.sendKeys(command);
        await target.item.clear();
    }

    /**
     * Send Keys to an input elements once it becomes available
     * @param {ElementFinder} target for element
     * @param {string} value to be sent
     * @param {boolean} sendEnter for sending an enter key
     */
    static async sendKeys(target: IDfElement,
                          value: string,
                          sendEnter = false) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await this.clearText(target);

        // On IE, text is sometimes not well sent, this is a workaround
        VerboseLogger.log(`Sending keys: ${value} to ${target.item.locator().toString()}`);
        await target.item.sendKeys(value);
        if (sendEnter) {
            await target.item.sendKeys(protractor.Key.ENTER);
        }
    }

    public static async typeSlowly(target: IDfElement, keys: string, delay: number) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        VerboseLogger.log(`Sending keys slowly: ${keys} to ${target.item.locator().toString()}`);
        await this.clearText(target);
        for (let i = 0; i < keys.length; i++) {
            await target.item.sendKeys(keys[i]);
            await WaitHelper.sleep(delay);
        }
    }

    /**
     * Checks whether an input box has particular value or not
     * @param target
     * @param text
     */
    static async hasValue(target: IDfElement, text: string) {
        const val = await TextBoxHelper.getAttributeValue(target,
            HtmlHelper.attributes.value);
        return val === text;
    }

    /**
     * Get attribute value
     * @param elem
     * @param attribute
     */
    static async getAttributeValue(elem: IDfElement | ElementFinder, attribute: string) {
        await WaitHelper.waitForElement(elem.item || elem);
        const value = await (elem.item || elem).getAttribute(attribute);
        return !!value ? value.trim() : value;
    }
}
