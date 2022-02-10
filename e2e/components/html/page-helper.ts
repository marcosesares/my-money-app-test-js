/**
 * Page helper for general utility
 */
import { browser, protractor, Key } from 'protractor';

import { StepLogger } from '../../../core/logger/step-logger';
import { VerboseLogger } from '../../../core/logger/verbose-logger';
import { Constants } from '../misc-utils/constants';
import { IDfElement } from '../misc-utils/i-df-element';

import { AlertHelper } from './alert-helper';
import { CoreConstants } from './core-constants';
import { ElementHelper } from './element-helper';
import { PageHelperExtension } from './page-helper-extension';
import { WaitHelper } from './wait-helper';

const { DEFAULT_TIMEOUT } = CoreConstants;
const shortId = require('shortid');

export class PageHelper extends PageHelperExtension {
    /**
     * Wrapper for executing javascript code
     * @param {string | Function} script
     * @param varAargs
     * @returns {promise.Promise<any>}
     */
    static async executeScript(script: string | Function,
                               ...varAargs: any[]) {
        return browser.driver.executeScript(script, varAargs);
    }

    /**
     * Get all browser window handles
     */
    static async getAllWindowHandles() {
        return await browser.getAllWindowHandles();
    }

    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async switchToNewTabIfAvailable(windowNumber = 1) {
        const handles = await this.getAllWindowHandles();
        const newWindowHandle = handles[windowNumber]; // this is your new window
        if (newWindowHandle) {
            await browser.switchTo().window(newWindowHandle);
        }
    }

    /**
     * Refresh a page
     * handles javascript alert if pops up on performing refresh action
     * @param dismissAlert
     */
    public static async refreshPage(dismissAlert = true) {
        try {
            await browser.navigate().refresh();
            if (dismissAlert) {
                await AlertHelper.dismissAlertIfExists();
            }
        } catch (e) {
            VerboseLogger.log(`Browser refresh failed: ${e}`);
        }
    }

    /**
     * Restarts and maximise browser
     *
     */
    public static async restartAndMaximizeBrowser() {
        try {
            StepLogger.subStep('Restart browser');
            await browser.restart();
            await PageHelper.maximizeBrowser();
        } catch (e) {
            VerboseLogger.log(`Browser restart failed: ${e}`);
        }
    }

    /**
     * Control + Click on element
     * @param target
     */
    public static async actionControlClick(target: IDfElement) {
        StepLogger.subStep(`Perform CTRL + click on ${target.name}`);
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await ElementHelper.actionMouseMove(target);
        await browser.actions().keyDown(Key.CONTROL)
            .click(target.item).perform();
        await ElementHelper.actionKeyUp(Key.CONTROL);
        await ElementHelper.actionMouseUp(target);
    }

    /**
     * Click on element
     * @param {DfElement} target
     * @returns {any}
     */
    static async click(target: IDfElement) {
        await WaitHelper.waitForElementToBeClickable(target.item);
        return await target.item.click();
    }

    /**
     * DblClick on element
     * @param {DfElement} target
     * @returns {any}
     */
    static async doubleClick(target: IDfElement) {
        StepLogger.subStep(`Perform double click on ${target.name}`);
        await WaitHelper.waitForElementToBeClickable(target.item);
        await browser.actions().doubleClick(target.item).perform();
    }

    /**
     * Switch to iFrame
     * @param target
     */
    static async switchToiFrame(target: IDfElement) {
        StepLogger.subStep(`Switch to iframe: ${target.name} by locator: ${target.item.locator()}`);
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.switchTo().frame(target.item.getWebElement());
    }

    /**
     * Switch to default content, and then switch to specified iFrame
     * @param target
     */
    static async switchToDefaultContentAndIFrame(target: IDfElement) {
        await this.switchToDefaultContent();
        await this.switchToiFrame(target);
    }

    /**
     * Gets promise for current url
     * @returns {any}
     */
    static async currentUrl() {
        return browser.getCurrentUrl();
    }

    /**
     * Go to url
     * @param url
     * @param waitForAngular
     */
    public static async goToUrl(url: string, waitForAngular = false) {
        await browser.waitForAngularEnabled(waitForAngular);
        return await browser.get(url, DEFAULT_TIMEOUT)
            .catch(() => false)
            .then(() => true);
    }

    /**
     * Get random alphanumeric id
     */
    public static getUniqueId(): string {
        // noinspection reason: Giving error for unknown character function
        // noinspection Annotator
        shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
        return shortId.generate().replace(/-/g, '').replace(/_/g, '');
    }

    /**
     * Get page title
     */
    public static async getTitle() {
        return await browser.driver.getTitle();
    }

    /**
     * Scroll to the element
     * @param target
     */
    public static async scrollToElement(target: IDfElement) {
        StepLogger.subStep(`Scroll to element: ${target.name}`);
        const { scrollIntoView } = Constants.jsScripts;
        return await browser.executeScript(scrollIntoView, target);
    }

    /**
     * Scroll and click on the element
     * @param target
     */
    public static async scrollToElementAndClick(target: IDfElement) {
        await this.scrollToElement(target);
        await this.click(target);
    }

    /**
     * Scroll and click twice on the element
     * @param target
     */
    public static async scrollToElementAndClickTwice(target: IDfElement) {
        await this.scrollToElement(target);
        await this.click(target);
        await this.click(target);
    }

    /**
     * Gets CSS attribute value
     * @param {WebElementPromise} target
     * @param {string} attribute
     * @returns {string} attribute value
     */
    public static async getCssValue(target: IDfElement, attribute: string) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        const attributeValue = await target.item.getCssValue(attribute);
        return attributeValue.trim();
    }

    /**
     * Get all browser windows count
     */
    public static async getWindowCount() {
        const handles = await browser.getAllWindowHandles();
        return handles.length;
    }

    /**
     * Switch to browser tab by index
     * @param tabNumber
     */
    public static async switchToTab(tabNumber: number) {
        const handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[tabNumber]);
    }

    /**
     * Press 'CTRL + A' on keyboard
     */
    public static async actionClickControlAButton() {
        await ElementHelper.actionSendKeys(protractor.Key
            .chord(protractor.Key.CONTROL, 'a'));
    }

    /**
     * Close browser tab
     */
    public static async closeTab() {
        await browser.driver.close();
    }

    /**
     * Verify if list's contents are equal
     * @param sourceList
     * @param destinationList
     */
    public static async verifyIfListContentsAreEqual(sourceList: any[], destinationList: any[]) {
        let isEquals = true;
        for (let i = 0; i < sourceList.length; i++) {
            if (!sourceList[i] === (destinationList[i])) {
                isEquals = false;
                break;
            }
        }
        return isEquals;
    }

    /**
     * Get tag name of the element
     * @param target
     */
    public static async getTagName(target: IDfElement) {
        await WaitHelper.waitForElement(target.item);
        return await target.item.getTagName();
    }

    /**
     * To resize the browser window
     */
    static async resizeWindow(width = -1, height = -1) {
        class Size {
            width: number;
            height: number;
        }

        const windowSize = await this.executeScript(function () {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight,
            };
        });

        const result = windowSize as Size;
        if (width !== -1) {
            result.width = width;
        }

        if (height !== -1) {
            result.height = height;
        }

        return this.setWindowSize(result.width, result.height);
    }
    /**
     * Sets window size
     * @param {number} width
     * @param {number} height
     */
    static async setWindowSize(width: number, height: number) {
        return browser.driver
            .manage()
            .window()
            .setSize(width, height);
    }
    /**
     * Get current url of the webpage
     */
    public static async getCurrentUrl() {
        return await browser.getCurrentUrl();
    }
}
