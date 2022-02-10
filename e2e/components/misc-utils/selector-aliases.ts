import { Locator } from "protractor";

import { DfElement, DfElements } from "../misc-utils/df-elements-helper";

export function $(locator: Locator, name: string) {
  return new DfElement(locator, name);
}

export function $$(locator: Locator, name: string) {
  return new DfElements(locator, name);
}
