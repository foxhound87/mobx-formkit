# Markdown Editor

A **live markdown editor** where a textarea bound to a form field renders a real-time preview via `react-markdown`. Because the form field is a MobX observable, every keystroke immediately updates the preview.

> 🔗 **Live Demo:** [Markdown Editor](https://foxhound87.github.io/mobx-formkit-demo/form/markdown)  
> 📁 **Source:** [FormMarkdown.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormMarkdown.tsx)  
> 📁 **Setup:** [markdown.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/markdown.ts)

---

## Concept

This demo showcases the simplest possible reactive pattern: a single field whose value is bound to a `<textarea>` for editing and simultaneously read by a `<ReactMarkdown>` component for preview. No `onChange` wiring, no `useEffect` — the MobX observable chain handles everything automatically.

---

## Form Setup

A single field `content` holds the entire markdown string. The initial value is imported from a markdown data file:

```javascript
import * as markdownData from '../data/example.md';

const fields = {
  content: {
    label: 'Markdown Text',
    value: markdownData.default,
  },
};
```

---

## Component Walkthrough

### The textarea

The `<Textarea>` component calls `field.bind()` which spreads `name`, `value`, `onChange`, and `onBlur` onto the textarea element. Every keystroke calls `field.onChange(e)`, which updates the MobX observable:

```jsx
<Textarea field={form.$('content')} />
```

Internally, the `<Textarea>` component (similar to `<Input>`) simply does:

```jsx
<textarea {...field.bind({ className: 'form-input' })} />
```

### The live preview

`<ReactMarkdown>` reads `form.$('content').value` — a MobX observable. Because the component is wrapped in `observer()`, it re-renders whenever `content.value` changes:

```jsx
<ReactMarkdown>{form.$('content').value}</ReactMarkdown>
```

### Separator

A `<div className="divider" />` separates the editor from the preview, making the split layout clear.

### The reactive chain

```
Keystroke → field.onChange(e) → MobX sets content.value
  → observer re-renders textarea (new value displayed)
  → observer re-renders ReactMarkdown (preview updated)
```

There is no explicit state, no `useEffect`, no manual DOM manipulation. MobX handles the entire pipeline.

---

## Key Takeaways

1. **Single field**: One field is enough for the editor + preview pattern.
2. **Automatic reactivity**: `observer()` catches every MobX change — the preview updates on every keystroke.
3. **No wiring**: `field.bind()` handles all event handlers on the textarea.
4. **Any preview library works**: Replace `react-markdown` with any renderer (HTML sanitizer, code highlighter, MathJax, etc.).
5. **Custom converters**: For non-string data, use `input`/`output` converter functions (see [Converters](../extra/converters.md)).
