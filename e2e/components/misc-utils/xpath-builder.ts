import { By } from 'protractor';

import { HtmlHelper } from './html-helper';

export function xpath(tag?: string) {
    return new XpathBuilder(tag);
}

const TEXT_TO_BE_REPLACED = 'TEXT_TO_BE_REPLACED';

export class XpathBuilder {
    constructor(tag = HtmlHelper.tags.any) {
        this._item = `//${tag}`;
    }

    _item: string;

    get item() {
        return this._item;
    }

    set item(value: string) {
        this._item = value;
    }

    where(attr: string, value?: string) {
        this._item += value ? `[@${attr}="${value}"]` : `[@${attr}]`;
        return this;
    }

    not() {
        this._item += `[not(${TEXT_TO_BE_REPLACED})]`;
        return this;
    }

    contains(attr: string, value: string, insideNot = false) {
        const locator = `[contains(@${attr},"${value}")]`;
        if (insideNot) {
            this._item = this._item.replace(TEXT_TO_BE_REPLACED,
                locator.substring(1, locator.length - 1));
        } else {
            this._item += locator;
        }
        return this;
    }

    startsWith(attr: string, value: string) {
        this._item += `[starts-with(@${attr},"${value}")]`;
        return this;
    }

    endsWith(attr: string, value: string) {
        this._item += `[ends-with(@${attr},${value})]`;
        return this;
    }

    ancestor(tag: string) {
        this._item += `/ancestor::${tag}`;
        return this;
    }

    goToParent(times = 1) {
        while (times-- > 0) {
            this._item += '/..';
        }
        return this;
    }

    parent(tag: string) {
        this._item += `/parent::${tag}`;
        return this;
    }

    followingSibling(tag: string) {
        this._item += `/following-sibling::${tag}`;
        return this;
    }

    precendingSibling(tag: string) {
        this._item += `/preceding-sibling::${tag}`;
        return this;
    }

    count() {
        this._item = `count(${this._item})`;
        return this;
    }

    normalizedSpace(attr: string, value: string) {
        this._item += `[normalize-space(@${attr})="${value}"]`;
        return this;
    }

    text(value: string) {
        this._item += `[text()="${value}"]`;
        return this;
    }

    textContains(value: string) {
        this._item += `[contains(text(),"${value}")]`;
        return this;
    }

    textContainsOr(values: string[]) {
        const text: string[] = [];
        values.map((value: string) => text.push(`contains(text(),"${value}")`));
        this._item += `[${text.join(' or ')}]`;
        return this;
    }

    descendant(tag: string) {
        this._item += `/${tag}`;
        return this;
    }

    anywhere(tag: string) {
        this._item += `//${tag}`;
        return this;
    }

    or(xpaths: string[]) {
        this._item += xpaths.join(' or ');
        return this;
    }

    and(xpaths: string[]) {
        this._item += xpaths.join(' and ');
        return this;
    }

    first() {
        this._item = `(${this._item})[1]`;
        return this;
    }

    last() {
        this._item = `(${this._item})[last()]`;
        return this;
    }

    nthChild(index: number) {
        this._item = `(${this._item})[${index}]`;
        return this;
    }

    odd() {
        this._item = `(${this._item})[position() mod 2 = 1 and position() > 0]`;
        return this;
    }

    buildByObject() {
        return By.xpath(this._item);
    }

    build() {
        return this._item;
    }
}
