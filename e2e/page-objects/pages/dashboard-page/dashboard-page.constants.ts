export class DashboardPageConstant {
  static readonly attributes = {
    selectors: {
      totalCreditsValue:
        "//div[contains(@class,'small-box')]//p[normalize-space()='Total Credits']/parent::div/h3",
      totalDebitsValue:
        "//div[contains(@class,'small-box')]//p[normalize-space()='Total Debits']/parent::div/h3",
      consolidatedValue:
        "//div[contains(@class,'small-box')]//p[normalize-space()='Consolidated']/parent::div/h3",
      totalCredits:
        "//div[contains(@class,'small-box')]//p[normalize-space()='Total Credits']",
      totalDebits:
        "//div[contains(@class,'small-box')]//p[normalize-space()='Total Debits']",
      consolidated:
        "//div[contains(@class,'small-box')]//p[normalize-space()='Consolidated']",
    },
    labels: {
      totalCreditsValue: "Total Credits Value",
      totalDebitsValue: "Total Debits Value",
      consolidatedValue: "Consolidated Value",
      totalCredits: "Total Credits",
      totalDebits: "Total Debits",
      consolidated: "Consolidated",
    },
  };
}
