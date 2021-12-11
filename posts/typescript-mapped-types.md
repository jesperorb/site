---
title: TypeScript - Mapped Types
description: This is a post about using mapped types in TypeScript.
date: 2021-11-29
tags:
  - TypeScript
layout: post
---

{% callout "info", "What you'll learn" %}

- Using **TypeScript Mapped Types**
- Mapping and combining literal union types

{% endcallout %}

## Use case

Many developers use some kind of color palette for handling all available colors in the project ([Tailwind Palette](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) and [Material Design Palette](https://material.io/design/color/the-color-system.html#color-theme-creation)). Either way you defined it you have a base color palette that consists of:

- A set of base colors: _red_, _green_, ...
- A set of variations: _100_, _200_, ...

How do we go about defining these variations in TypeScript as **one literal type union without having to write every possible combination**? We want the outcome like below:

```ts
type ColorPalette = "red-100" | "red-200" | "blue-100" | "blue-200";
```

## Easy solution

Luckily TypeScript already has this behavior built in. We can use [**Template Literal Types**](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) to iterate every scenario:

```ts
type BaseColors = "red" | "green";
type ColorVariations = "100" | "200";
type ColorPalette = `${BaseColors}-${ColorVariations}`;
```

The solution above will generate a type with every combination.

## The hard way

But for the sake of learning let go through how we can manually recreate this behavior using Mapped Types. And because this is the original way I did it before I figured out it is already built in 😅.

We can start by defining our colors as one literal type union:

```ts
type Colors = "red" | "blue";
```

And our variations as another literal type union:

```ts
type ColorVariations = "100" | "200";
```

We can use [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) to iterate all variations for
one color. Using [`as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as) to combine a color with every possible variation. The value does not matter because we will only use the key, that is why it is set to `true`.

```ts
type ColorVariations = "100" | "200";

// Extend "string" to make sure the color is a string: "red"
type ToVariationsFromColor<BaseColor extends string> = {
  // For each Variation in ColorVariations
  // Rename variation to -> `color-variation`
  // And set the value to `true`
  [Variation in ColorVariations as `${BaseColor}-${Variation}`]: true;
};

// Use case:
// This will result in: { "red-100": true, "red-200": true }
type AllRedVariantsAsObject = ToVariationsFromColor<"red">;
// Grab all keys, this will result in: "red-100" | "red-200"
type AllRedVariantsAsType = keyof AllRedVariantsAsObject;
```

We now have every combination for one specific color. But we want to map every possible color we have. The solution is to use another mapped type (another loop) to go through all colors and use our previously defined `ToVariationsFromColor` on each color.

```ts
type BaseColors = "red" | "green";
type ColorVariations = "100" | "200";

// This is the same as before
type ToVariationsFromColor<BaseColor extends string> = {
  [Variation in ColorVariations as `${BaseColor}-${Variation}`]: true;
};

type ToBaseColorsMapPalette = {
  // For each Color in BaseColors
  // Create an object with every possible variation for that color
  // And use only the keys of that type (keyof).
  [Color in BaseColors]: keyof ToVariationsFromColor<Color>;
};

// Use case:
// This will result in:
// {
//  "red": "red-100" | "red-200"
//  "green": "green-100" | "green-100"
// }
type ColorMap = ToBaseColorsMapPalette;
// Use Lookup Types to extract ONLY the values
// Which are the types we want to use
// This will result in: "red-100" | "red-200" | etc
type ColorPalette = ColorMap[keyof ColorMap];
```

The last `type` is the finished product. The type `ColorPalette` will contain every variation. We can now use it wherever we want to use any of these colors and get autocomplete from TypeScript. For example as a prop to a component in React:

```tsx
// Box.tsx
import { ColorPalette } from "./Color.ts";

type BoxProps = {
  color?: ColorPalette;
};

export const Box = (props: BoxProps) => {
  // ...
};
```

```tsx
<Box color="red-100">I am red</Box>
```

## Conclusion

Using Mapped Types in combination with `typeof` can be extremely powerful and useful. In this example I tried to solve an actual practical use case that I myself have encountered.

There may be some way to make this more compact or _"effecient"_. But when it comes to cases like these I prefer to be more verbose and to break things up into several steps.

If you want to read more about TypeScript I recommend **[TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)**.

If you want more examples of stuff you can do with types I recommend checking out **[type-challenges](https://github.com/type-challenges/type-challenges)**. A lot of bonkers type juggling that are impossible to read and hard to understand, but fun nevertheless.
