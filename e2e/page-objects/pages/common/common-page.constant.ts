export class CommonPageConstant {
  static readonly attributes = {
    selectors: {
      appLogo: ".login-logo",
      headerSectionLabel: ".content-header h1",
      userNameLabel: ".hidden-xs",
      dashboardMenuLink: "//span[normalize-space()='Dashboard']",
      registerMenuLink: "//a[span[normalize-space()='Register']]",
      paymentCyclesMenuLink: "//a[span[normalize-space()='Payment cycles']]",
    },
    labels: {
      appLogo: "My Money Logo",
      headerSectionLabel: "Page Header Label",
      userNameLabel: "Logged in User Label",
      dashboardMenuLink: "Dashboard Menu Link",
      registerMenuLink: "Register Menu Link",
      paymentCyclesMenuLink: "Payment cycles Menu Link",
    },
  };
}
