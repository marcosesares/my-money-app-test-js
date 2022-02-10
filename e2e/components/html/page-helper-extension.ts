/**
 * Extension of Page helper for general utility
 */
import { browser, protractor, Key } from 'protractor';

import { StepLogger } from '../../../core/logger/step-logger';
import { Constants } from '../misc-utils/constants';
import { IDfElement } from '../misc-utils/i-df-element';

import { CoreConstants } from './core-constants';
import { WaitHelper } from './wait-helper';

const { MAX_RETRY_ATTEMPTS } = CoreConstants;

const on = require('await-handler');

export class PageHelperExtension {

    /**
     * Iterates over all the iFrame-elements passed
     * @param targets
     */
    static async switchToiFrames(targets: IDfElement[]) {
        for (const target of targets) {
            StepLogger.subStep(`Switch to iframe: '${target.name}' by locator: ${target.item.locator()}`);
            await WaitHelper.waitForElementToBePresent(target.item);
            await browser.switchTo().frame(target.item.getWebElement());
        }
    }

    /**
     * Execute a piece of code inside iframe block
     * @param targets
     * @param fn
     * @param switchBack
     */
    static async executeInIFrame(targets: IDfElement[], fn: Function, switchBack = true) {
        await PageHelperExtension.switchToiFrames(targets);

        await fn();

        if (switchBack) {
            await PageHelperExtension.switchToDefaultContent();
        }
    }

    static async switchToDefaultContent() {
        StepLogger.subStep('Switch to "Default Content"');
        await browser.driver.switchTo().defaultContent();
    }

    /**
     * Perform Right Click
     * @param target
     */
    static async rightClick(target: IDfElement) {
        StepLogger.subStep('Perform "Right" click');
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().click(protractor.Button.RIGHT).perform();
    }

    /**
     * Open link in new tab by CTRL + click
     * @param target
     */
    static async openLinkInANewTab(target: IDfElement) {
        StepLogger.subStep('Open link in new tab by CTRL + click');
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().keyDown(protractor.Key.CONTROL).click().perform();
    }

    /**
     * Push 'CTRL' key on keyboard
     */
    static async actionPushControlKeyboard() {
        StepLogger.subStep('KeyDown "Control" on keyboard');
        await browser.actions().keyDown(Key.CONTROL).perform();
    }

    /**
     * Keyup 'CTRL' key
     */
    static async controlKeyFree() {
        StepLogger.subStep('KeyUp "Control" on keyboard');
        await browser.actions().keyUp(Key.CONTROL).perform();
    }

    /**
     * Send 'DELETE' key on keyboard
     */
    static async clickOnDeleteButton() {
        StepLogger.subStep('Sendkeys "DELETE" button on keyboard');
        await browser.actions().sendKeys(protractor.Key.DELETE).perform();
    }

    /**
     * Send 'Shift + C' on keyboard
     * @param target
     */
    static async shiftPlusCShortCut(target: IDfElement) {
        StepLogger.subStep('Send "CTRL + C" on keyboard');
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().keyDown(protractor.Key.SHIFT).sendKeys('c').perform();
    }

    /**
     * Send 'Shift + P' on keyboard
     * @param target
     */
    static async shiftPlusPShortCut(target: IDfElement) {
        StepLogger.subStep('Send "SHIFT + P" on keyboard');
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().keyDown(protractor.Key.SHIFT).sendKeys('P').perform();
    }

    /**
     * Close all browser tabs & switch to first
     */
    public static async closeAllTabsAndSwitchToFirst() {
        StepLogger.subStep('Close all tabs & switch to first');
        const handles = await browser.getAllWindowHandles();
        for (let count = handles.length; count > 1; count--) {
            await browser.switchTo().window(handles[count - 1]);
            await browser.driver.close();
        }
        await browser.switchTo().window(handles[0]);
        await browser.switchTo().defaultContent();
    }

    /**
     * Maximize browser
     */
    public static async maximizeBrowser() {
        try {
            await browser.driver.manage().window().maximize();
        } catch (e) {
            // catch error if window cannot be maximised
        }
    }

    /**
     * This function closes current tab of browser
     * @returns {Promise<void>}
     */
    public static async closeCurrentTab() {
        await browser.executeScript(Constants.jsScripts.windowClose);
    }

    /**
     * This method can execute 'fn' multiple times based on the {maxCount} argument
     * If any exception is thrown during execution of 'fn', then current page would be
     * refreshed and same function would be called unless maxCount value is reached
     * @param {Function} fn
     * @param {boolean} refresh
     * @param {number} maxCount
     * @returns {Promise<any>}
     */
    public static async executeFunctionMultipleTimes(fn: Function, refresh = false,
                                                     maxCount = MAX_RETRY_ATTEMPTS) {
        if (maxCount > MAX_RETRY_ATTEMPTS) {
            throw new Error(`MaxCount value should be equal or less than: ${MAX_RETRY_ATTEMPTS}`);
        }
        for (let count = 0; count < maxCount; count++) {
            const [err, result] = await on(fn());
            if (err) {
                StepLogger.subStep(`\tError while executing function: ${err}\n\t*Current count*: ${count}`);
                if (count === (maxCount - 1)) {
                    throw err;
                }
                if (refresh) {
                    await browser.switchTo().defaultContent();
                    await browser.navigate().refresh();
                }
            } else {
                return result;
            }
        }
    }

    /**
     * Helps in executing code in newly opened tab
     * @param fn
     * @param windowNumber
     * @param toCloseAfterExecution
     */
    static async executeInNewTab(fn: Function, windowNumber = 1,
                                 toCloseAfterExecution = true) {
        await WaitHelper.waitUntilTabsCountEqual(windowNumber + 1);
        let windowChanged = false;
        try {
            const handles = await browser.getAllWindowHandles();
            const newWindowHandle = handles[windowNumber]; // this is your new window
            if (newWindowHandle) {
                await browser.switchTo().window(newWindowHandle);
                windowChanged = true;
            }
            await fn();
        } finally {
            if (windowChanged && toCloseAfterExecution) {
                await browser.driver.close();
                const handles = await browser.getAllWindowHandles();
                await browser.switchTo().window(handles[0]);
            }
        }
    }

    /**
     * Scroll to the bottom of webpage
     * @returns {Promise<any>}
     */
    static async scrollToBottom() {
        await browser.driver.executeScript(Constants.jsScripts.scrollToBottom);
    }

    /**
     * Clear browser cookies
     */
    static async clearCookies() {
        await browser.driver.manage().deleteAllCookies();
    }

}
