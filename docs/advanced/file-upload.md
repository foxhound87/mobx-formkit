# File Upload

Handle **file inputs** and **drag-and-drop upload zones** via fields with `type: 'file'`. The form treats file fields as first-class citizens — they expose the selected `FileList`, support drop events, and integrate with validation.

> 🔗 **Live Demo:** [File Upload](https://foxhound87.github.io/mobx-formkit-demo/form/fileUpload)  
> 📁 **Source:** [FormFileUpload.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormFileUpload.tsx)  
> 📁 **Setup:** [fileUpload.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/fileUpload.ts)

---

## Concept

File fields use `type: 'file'` in the field definition. This tells the form to store a `FileList` or dropped files instead of a plain string/number value. The `field.files` property exposes the selected files, and the `onDrop` hook handles drag-and-drop events.

---

## Form Setup

Two file fields — one for a standard file input, one for a drag-and-drop zone:

```javascript
const fields = {
  myFileUpload: {
    type: 'file',
    hooks: {
      onDrop: field => console.log('onDrop', field.files),
    },
  },
  myDropZone: {
    type: 'file',
    hooks: {
      onDrop: field => console.log('onDrop', field.files),
    },
  },
};
```

Both fields share the same `onDrop` hook, but in a real application you would:

- Read the file(s) with `FileReader` for preview
- Upload them to a server
- Set custom validation for file type, size, or count

---

## Field Properties for File Fields

### `field.files`

Returns the current `FileList` (or array of dropped files). This is the primary way to access uploaded files programmatically.

### `type: 'file'`

Tells the form that this field stores file data. When set, `field.value` will be a reference to the file object or `null`.

### `onDrop` hook

Fired when files are dropped onto a drag-and-drop zone. The hook receives the `field` instance and the drag event:

```javascript
hooks: {
  myDropZone: {
    onDrop(field, e) {
      // field.files now contains the dropped files
      const files = Array.from(field.files);
      console.log(files.map(f => f.name));
    },
  },
}
```

---

## Component Walkthrough

The demo renders two file upload areas side by side:

### Standard file input

Uses a native `<input type="file">` bound via `field.bind()`. The `multiple` attribute allows selecting several files at once:

```jsx
<input
  {...field.bind()}
  type="file"
  multiple
  className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-50 file:text-brand-700"
/>
```

### Drag-and-drop zone

A styled `<div>` that accepts file drops. The `onDrop` event handler is attached via the field's `hooks.onDrop`:

```jsx
<div
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    field.hooks.onDrop(field, e);
  }}
  className="drop-zone"
>
  <Upload size={24} />
  <p>Drop files here</p>
</div>
```

---

## Validation with File Fields

File fields can be validated like any other field. Add `rules` to enforce file requirements:

```javascript
const fields = {
  avatar: {
    type: 'file',
    label: 'Profile Picture',
    rules: 'required',
    hooks: {
      onChange(field) {
        const file = field.files?.[0];
        if (file) {
          // Client-side validation
          if (!file.type.startsWith('image/')) {
            field.invalidate('Only image files are allowed');
          }
          if (file.size > 5 * 1024 * 1024) {
            field.invalidate('File must be less than 5MB');
          }
        }
      },
    },
  },
};
```

---

## Reading file contents

Use the `FileReader` API to read file contents (e.g., for image preview):

```javascript
hooks: {
  onDrop(field) {
    const file = field.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        field.set('extra', {
          previewUrl: e.target.result,
          fileName: file.name,
          fileSize: file.size,
        });
      };
      reader.readAsDataURL(file);
    }
  },
},
```

---

## Key Takeaways

1. **`type: 'file'`**: Declares a field as a file uploader — stores File objects instead of strings.
2. **`field.files`**: Access the selected/dropped file list from any file field.
3. **`onDrop` hook**: Handle drag-and-drop events declaratively in the field definition.
4. **Validation works**: Add `rules` and custom validation to enforce file type, size, or count.
5. **FileReader for preview**: Combine with `FileReader` to show image previews or parse uploaded data.
6. **Two modes**: Standard `<input type="file">` for click-to-browse, or custom drop zone for drag-and-drop.
