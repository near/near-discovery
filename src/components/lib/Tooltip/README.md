# Tooltip

Implemented via Radix primitives: https://www.radix-ui.com/docs/primitives/components/tooltip

_If the current props and Stitches style overrides aren't enough to cover your use case, feel free to implement your own component using the Radix primitives directly._

## Example

Simply wrap the element you desire to have a tooltip with the `<Tooltip>` component:

```tsx
import { Tooltip } from '@/components/lib/Tooltip';

...

<Tooltip content="I am the tooltip message.">
  <Button>Curious Button</Button>
</Tooltip>
```

## Props

To simplify usage of the Radix tooltip primitives, the component abstracts away the need for using `Root`, `Trigger`, and `Content` - all you need to do is use the single `<Tooltip>` component as shown above.

To pass a [Root](https://www.radix-ui.com/docs/primitives/components/tooltip#root) option, use the `root={{}}` property like so:

```tsx
<Tooltip
  content="I am the tooltip message."
  root={{
    delayDuration: 500,
  }}
>
  ...
</Tooltip>
```

To pass a [Content](https://www.radix-ui.com/docs/primitives/components/tooltip#content) option, pass it as you normally would like so:

```tsx
<Tooltip content="I am the tooltip message." side="left" align="end">
  ...
</Tooltip>
```

## Content

The `content` prop can be passed a string to render a default message:

```tsx
<Tooltip content="I am the tooltip message.">...</Tooltip>
```

A `ReactNode` can also be passed if you want to use a custom set of elements for the message.

```tsx
<Tooltip
  content={
    <>
      <FeatherIcon icon="eye" /> I have an icon.
    </>
  }
>
  ...
</Tooltip>
```

## Disabled

Sometimes you might need to temporarily disable the tooltip from appearing. You can use the `disabled` prop to prevent the tooltip from showing while still letting the child element be interacted with:

```tsx
<Tooltip content="I am the tooltip message." disabled={shouldDisableTooltip}>
  <Button>Curious Button</Button>
</Tooltip>
```

You can also disable the tooltip for touch screens:

```tsx
<Tooltip content="I will not show on touch screen devices." disabledTouchScreen>
  <Button>Curious Button</Button>
</Tooltip>
```
