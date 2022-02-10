import { browser } from "protractor";
import { CoreConstants } from "../components/html/core-constants";
import { PageContract } from "./contracts/page.contract";

const { DEFAULT_TIMEOUT } = CoreConstants;
export abstract class BasePageHelper implements PageContract {
  abstract url(): string;

  async goTo() {
    return this.get(this.url());
  }

  async get(url: string) {
    await browser.waitForAngularEnabled(false);
    return browser.get(url, DEFAULT_TIMEOUT);
  }

  async verifyExistence() {
    const currentUrl = await browser.getCurrentUrl();
    return currentUrl.indexOf(this.url()) > -1;
  }
}
