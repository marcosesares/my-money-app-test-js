import { By } from "protractor";

import { $ } from "../../../components/misc-utils/selector-aliases";

import { PaymentCyclePageConstant } from "./payment-cycle-page.constants";
import { IDfElement } from "./../../../components/misc-utils/i-df-element";

const {
  attributes: { selectors, labels },
} = PaymentCyclePageConstant;

export class PaymentCyclePage {
  static get header() {
    return {
      get paymentCycleHeader() {
        return labels.paymentCycleHeader;
      },
    };
  }

  static get form() {
    return {
      get list() {
        return $(By.css(selectors.list), labels.list);
      },
      get add() {
        return $(By.css(selectors.add), labels.add);
      },
      get nameColumn() {
        return $(By.xpath(selectors.nameColumn), labels.nameColumn);
      },
      get monthColumn() {
        return $(By.xpath(selectors.monthColumn), labels.monthColumn);
      },
      get yearColumn() {
        return $(By.xpath(selectors.yearColumn), labels.yearColumn);
      },
      get actionsColumn() {
        return $(By.xpath(selectors.actionsColumn), labels.actionsColumn);
      },
      get nameTextbox() {
        return $(By.css(selectors.nameTextbox), labels.nameTextbox);
      },
      get monthTextbox() {
        return $(By.css(selectors.monthTextbox), labels.monthTextbox);
      },
      get yearTextbox() {
        return $(By.css(selectors.yearTextbox), labels.yearTextbox);
      },
      get save() {
        return $(By.xpath(selectors.save), labels.save);
      },
      get cancel() {
        return $(By.xpath(selectors.cancel), labels.cancel);
      },
    };
  }

  static getListTableCell(column: string, value: string): IDfElement {
    return $(
      By.xpath(
        `//div[@id='tabList']
         //td[count(//table/thead/tr/th[.='${column}']/preceding-sibling::th)+1][normalize-space()='${value}']`
      ),
      `${value} cell under ${column} column`
    );
  }

  static getCreditAddButton(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Credits']]]
         //input[@name='credits[${row}].name']/parent::td/parent::tr//button[contains(@class, 'btn-success')]`
      ),
      `Credit Add Button for row index: ${row}`
    );
  }

  static getCreditCopyButton(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Credits']]]
         //input[@name='credits[${row}].name']/parent::td/parent::tr//button[contains(@class, 'btn-warning')]`
      ),
      `Credit Copy Button for row index: ${row}`
    );
  }

  static getCreditDeleteButton(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Credits']]]
         //input[@name='credits[${row}].name']/parent::td/parent::tr//button[contains(@class, 'btn-danger')]`
      ),
      `Credit Delete Button for row index: ${row}`
    );
  }

  static getCreditValueTextbox(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Credits']]]
         //input[@name='credits[${row}].value']`
      ),
      `Credit Value Textbox for row index: ${row}`
    );
  }

  static getCreditNameTextbox(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Credits']]]
         //input[@name='credits[${row}].name']`
      ),
      `Credit Name Textbox for row index: ${row}`
    );
  }

  static getDebitAddButton(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Debits']]]
        //input[@name='debts[${row}].name']/parent::td/parent::tr//button[contains(@class, 'btn-success')]`
      ),
      `Debit Add Button for row index: ${row}`
    );
  }

  static getDebitCopyButton(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Debits']]]
        //input[@name='debts[${row}].name']/parent::td/parent::tr//button[contains(@class, 'btn-warning')]`
      ),
      `Debit Copy Button for row index: ${row}`
    );
  }

  static getDebitDeleteButton(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Debits']]]
        //input[@name='debts[${row}].name']/parent::td/parent::tr//button[contains(@class, 'btn-danger')]`
      ),
      `Debit Delete Button for row index: ${row}`
    );
  }

  static getDebitValueTextbox(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Debits']]]
        //input[@name='debts[${row}].value']`
      ),
      `Debit Value Textbox for row index: ${row}`
    );
  }

  static getDebitNameTextbox(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Debits']]]
        //input[@name='debts[${row}].name']`
      ),
      `Debit Name Textbox for row index: ${row}`
    );
  }

  static getDebitStatusTextbox(row: number): IDfElement {
    return $(
      By.xpath(
        `//div[fieldset[legend[normalize-space()='Debits']]]
         //input[@name='debts[${row}].status']`
      ),
      `Debit Status Textbox for row index: ${row}`
    );
  }
}
