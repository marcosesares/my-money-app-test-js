export class PaymentCyclePageConstant {
  static readonly attributes = {
    selectors: {
      list: "button[data-target='tabList']",
      add: "button[data-target='tabCreate']",
      nameColumn: "//div[@id='tabList']//th[contains(text(),'Name')]",
      monthColumn: "//div[@id='tabList']//th[contains(text(),'Month')]",
      yearColumn: "//div[@id='tabList']//th[contains(text(),'Year')]",
      actionsColumn: "//div[@id='tabList']//th[contains(text(),'Actions')]",
      nameTextbox: "input[placeholder='Inform the billing Name']",
      monthTextbox: "input[placeholder='Inform the billing Month']",
      yearTextbox: "input[placeholder='Inform the billing Year']",
      save: "//button[normalize-space()='Save']",
      cancel: "//button[normalize-space()='Cancel']",
    },
    labels: {
      paymentCycleHeader: "Payment Cycle Register",
      list: "List Tab Button",
      add: "Register Button",
      nameColumn: "Name Column",
      monthColumn: "Month Column",
      yearColumn: "Year Column",
      actionsColumn: "Actions Column",
      nameTextbox: "Name Textbox",
      monthTextbox: "Month Textbox",
      yearTextbox: "Year Textbox",
      save: "Save Button",
      cancel: "Save Button",
    },
  };
}
