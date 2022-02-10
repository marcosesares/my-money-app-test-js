import { IDfElement } from '../misc-utils/i-df-element';

import { WaitHelper } from './wait-helper';

export class CheckboxHelper {

    /**
     * Mark checkbox if element is not checked already
     * @param target
     * @param markChecked
     */
    static async markCheckbox(target: IDfElement, markChecked: boolean) {
        await WaitHelper.waitForElementToBeClickable(target.item);

        const isSelected = await target.item.isSelected();
        if (isSelected !== markChecked) {
            await target.item.click();
        }
        return;
    }

    /**
     * Check if given element is checked
     * @param target
     */
    static async isCheckboxChecked(target: IDfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        return target.item.isSelected();
    }
}
