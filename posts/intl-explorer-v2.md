---
title: Intl Explorer v2
description: Intl Explorer is an interactive tool for experimenting and trying out the ECMAScript Internationalization API.
date: 2022-10-16
tags:
  - JavaScript
  - Svelte
  - TypeScript
layout: post
---

{% callout "info", "Summary" %}

**Intl Explorer** is a tool for experimenting and trying out the ECMAScript Internationalization API.

- This tools is available at: [https://www.intl-explorer.com](https://www.intl-explorer.com/?locale=en-US)
- Source Code available at: [GitHub](https://github.com/jesperorb/intl-explorer)

{% endcallout %}

## Intro

Supported by all major browsers, the `Intl` object provides access to the *ECMAScript Internationalization API*, a suite of functions for **language sensitive** string comparison, number formatting, and more.

**Intl Explorer** is a website for experimenting with these functions and see the result evaluated in a code snippet. Every code snippet also comes with a *Copy*-button which copies the code that produces the result to your clipboard.

Furthermore the website provides browser compability data directly from MDN about which functions can be used in which browsers.

## Background

I built this tool because I had found out about `Intl.DateTimeFormat` and wanted to use it in my companys code. But we already had some specific date formats in our designs (relying on `date-fns` or similar formatters). I wasn't sure that a conversion was possible or if we were going to have to change some date format to better suite the output of `Intl.DateTimeFormat`.

MDN is great and has all the info and some interactive examples but it has some issues:
- I have to manually enter a locale and run the code for each locale I was interested in. This means that I also have to have knowledge of every possile locale name (`sv`/`en-US` etc.)
- I was looking for specific output to match, which means I have to test out every possible option to see which option it is I want to use.

This is some tedious work. So I thought to myself:
- Can I loop through every option and output the result?
- Can I get a list of every possible locale and dynamically change the locale and therefor the output of an option?

This was also **really tedious work** but it was feasible, and that was the start of what is now: **https://www.intl-explorer.com/**

## Technology used

Intl-explorer is built with **[SvelteKit](https://kit.svelte.dev/)** and [TypeScript](https://www.typescriptlang.org/). And that is basically it.

For the [Playground](https://www.intl-explorer.com) I am using [svelte-higlight](https://github.com/metonym/svelte-highlight) to highlight code snippets.

For the browser compability data I am using [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data). This is a big package with everything in it. So for better handling I am looping through it creating specific `.json`-files for each page with just only the required data.

## How it works

### Getting each option

Every function under the namespace has an `options`-object to pass as second argument:

```ts
new Intl.ListFormat("en-US", {
  type: "conjunction",
  style: "long",
})
.format(["Miso", "Sesam"])
// Miso and Sesam
```

The process of getting the correct data for each function was where most of the time went as it was bit tedious to get right. I manually looked at the TypeScript-types for each function and created objects that represent those values:
```ts
export const listFormatOptions = {
	type: [undefined, 'conjunction', 'disjunction', 'unit'],
	style: [undefined, 'long', 'short', 'narrow'],
} as const;
```

You can find these types in the TypeScript source repo. For example in the file: [`lib/lib.es5.d.ts`](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts). It can be a bit tricky to get all the types tho because not everything was implemented in ECMAScript5. So you may find some more types in different lib-files. For example [`lib/lib.es2022.d.t`](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2022.intl.d.ts) includes the types for the `Segmenter`-function which is the newest one.

When you have these options gathered you can loop through them and call each function under `Intl` with each option and show the output.

### Getting each locale

I think I got this from Stack Overflow. Someone has just compiled a list based on some spec/wiki which every possible known locale. [Source File: This is just a big hard coded object](https://github.com/jesperorb/intl-explorer/blob/main/src/lib/locale-data/locales.ts) 🤷.

It is the same with calendars, currencies and units. These are just hard coded. With `units` (yards, miles etc.) I tried looking at the specification and compile my own list of every possible unit. But it turns out not every unit in the spec is implemented and it does not say which are implemented or not.

### Closing notes

I hope you will have use for this tool! Please give it a star on GitHub. And if you have found any issues, please file an issue at GitHub. Thank you!
