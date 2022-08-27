---
title: Intl Explorer
description: Exploring the Intl-API
date: 2022-08-27
tags:
  - JavaScript
  - Svelte
layout: post
---

{% callout "info", "Summary" %}

- Tool available at: [Intl Explorer](https://jesperorb.github.io/intl-explorer/)
- Source Code available at: [GitHub](https://github.com/jesperorb/intl-explorer)

{% endcallout %}

`Intl` in JavaScript is the common namespace for the Internationalization API. This means language sensitive number formatting and datetime formatting.

I found that it was a bit hard to get an overview of what can be done with this API. Specifically what the outcome of each option of the API would generate.

To solve this I built a tool to explore all possible methods and options for these methods: **[Intl Explorer](https://jesperorb.github.io/intl-explorer/)**

For each method under the Intl-APi you can specify a locale to use and depending on the method, some extra options to pass to the method.

It will then display each possible option with the outcome of the option. For easier access there is also a "Copy" button for each possible option that copies the code used to your clipboard, for example:

```js
new Intl.DateTimeFormat(
  "sv-SE",
  {"dateStyle":"full"}
).format(new Date("2004-04-04T04:04:04"))
```

If you like it and have use for it, leave a star at the GitHub repository. And if you found something that is wrong or does not work, please submit a PR to the repo. Thanks!