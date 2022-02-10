import { by } from "protractor";

import { HtmlHelper } from "../../../components/misc-utils/html-helper";
import { IDfElement } from "../../../components/misc-utils/i-df-element";
import { $ } from "../../../components/misc-utils/selector-aliases";
import { xpath } from "../../../components/misc-utils/xpath-builder";

import { CommonPageConstant } from "./common-page.constant";

const {
  attributes: { selectors, labels },
} = CommonPageConstant;

export class CommonPage {
  static get sideMenu() {
    return {
      get dashboardMenuLink() {
        return $(
          by.xpath(selectors.dashboardMenuLink),
          labels.dashboardMenuLink
        );
      },
      get registerMenuLink() {
        return $(by.xpath(selectors.registerMenuLink), labels.registerMenuLink);
      },
      get paymentCyclesMenuLink() {
        return $(
          by.xpath(selectors.paymentCyclesMenuLink),
          labels.paymentCyclesMenuLink
        );
      },
    };
  }

  static get form() {
    return {
      get headerSectionLabel() {
        return $(
          by.css(selectors.headerSectionLabel),
          labels.headerSectionLabel
        );
      },
      get userNameLabel() {
        return $(by.css(selectors.userNameLabel), labels.userNameLabel);
      },
      get appLogo() {
        return $(by.css(selectors.appLogo), labels.appLogo);
      },
    };
  }

  static getElementByPlaceHolder(value: string, name: string): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.placeholder}='${value}']`), name);
  }

  static getElementByTextAndHref(href: string, text: string): IDfElement {
    return $(
      xpath()
        .contains(HtmlHelper.attributes.href, href)
        .text(text)
        .buildByObject(),
      text
    );
  }

  static getElementByContainsTextAndHref(
    href: string,
    text: string
  ): IDfElement {
    return $(
      xpath()
        .contains(HtmlHelper.attributes.href, href)
        .textContains(text)
        .buildByObject(),
      text
    );
  }

  static getElementByIdEndsWith(idValue: string, name: string): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.id}$='${idValue}']`), name);
  }

  static getElementByIdContains(idValue: string, name: string): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.id}*='${idValue}']`), name);
  }

  static getElementByIdStartsWith(idValue: string, name: string): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.id}^='${idValue}']`), name);
  }

  static getElementByNameStartsWith(
    nameValue: string,
    name: string
  ): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.name}^='${nameValue}']`), name);
  }

  static getElementByNameContains(nameValue: string, name: string): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.name}*='${nameValue}']`), name);
  }

  static getElementByNameEndsWith(nameValue: string, name: string): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.name}$='${nameValue}']`), name);
  }

  static getElementByClassContains(
    className: string,
    name: string
  ): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.class}*='${className}']`), name);
  }

  static getElementByClassEndsWith(
    className: string,
    name: string
  ): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.class}$='${className}']`), name);
  }

  static getElementByClassStartsWith(
    className: string,
    name: string
  ): IDfElement {
    return $(by.css(`[${HtmlHelper.attributes.class}^='${className}']`), name);
  }
}
