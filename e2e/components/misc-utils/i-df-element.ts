import { ElementFinder } from 'protractor';

export interface IDfElement {
    item: ElementFinder;
    name: string;

    /**
     * Click button using JS
     * It logs X button is clicked using subStep
     */
    clickButtonJs(): Promise<void>;

    /**
     * Click button
     * It logs X button is clicked using subStep
     */
    clickButton(): Promise<void>;

    /**
     * Click link
     * It logs X link is clicked using subStep
     */
    clickLink(): Promise<void>;

    /**
     * Click checkbox
     * It logs X checkbox is clicked using subStep
     */
    clickCheckbox(): Promise<void>;

    /**
     * Click link
     * It logs X link is clicked using subStep
     */
    clickLinkJs(): Promise<void>;

    /**
     * Perform 'Sendkeys' operation
     * It logs sequence of strings passed to the element
     * @param text
     */
    sendKeys(text: string): Promise<void>;

    /**
     * Schedules a command to clear the value of this element
     */
    clearText(): Promise<void>;

    /**
     * Schedules a command to type a sequence on the DOM element represented by this instance
     * if {value} passed is defined
     * @param text
     */
    sendKeysIfTextIsDefined(text: string): Promise<void>;

    /**
     * Verify whether an element is displayed
     */
    verifyDisplayedStatus(): Promise<void>;

    /**
     * Verify whether an element is present
     */
    verifyPresentStatus(): Promise<void>;

    /**
     * Get Css value
     * @param attribute
     */
    getCssValue(attribute: string): Promise<string>;

    /**
     * Verify if text value is entered properly
     * @param expected
     */
    verifyTextEntered(expected: string): Promise<void>;

    /**
     * Perform 'HoverOver' operation using Action class
     */
    hoverOver(): Promise<void>;

    /**
     * Perform hoverOver and click using Action class
     */
    hoverOverAndClick(): Promise<void>;

    /**
     * Get text
     */
    getText(): Promise<any>;

    /**
     * Get attribute
     * @param attribute
     */
    getAttribute(attribute: string): Promise<string>;

    /**
     * Scroll to element
     */
    scrollToElement(): Promise<void>;

    /**
     * Verify hidden status
     */
    verifyHiddenStatus(): Promise<void>;

    /**
     * Verify text box contains {expected} value
     * @param expected
     */
    verifyTextBoxContains(expected: string): Promise<void>;

    /**
     * Get currently selected option
     */
    getSelectedOptionText(): Promise<string>;
}
