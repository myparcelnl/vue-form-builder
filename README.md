# Vue Form builder

[![NPM](https://img.shields.io/npm/v/@myparcel/vue-form-builder?labelColor=27272A&logoColor=FFFFFF&style=for-the-badge&color=CC3534&logo=npm)](https://npmjs.com/package/@myparcel/vue-form-builder/)
[![Vue version](https://img.shields.io/npm/dependency-version/@myparcel/vue-form-builder/vue?labelColor=27272A&logoColor=FFFFFF&style=for-the-badge)](https://img.shields.io/npm/v/@myparcel/vue-form-builder?labelColor=27272A&logoColor=FFFFFF&style=for-the-badge&color=CC3534&logo=npm)
[![Issues](https://img.shields.io/github/issues/myparcelnl/vue-form-builder?labelColor=27272A&logoColor=FFFFFF&style=for-the-badge&logo=github)](https://github.com/myparcelnl/vue-form-builder/issues/)
[![Pull Requests](https://img.shields.io/github/issues-pr/myparcelnl/vue-form-builder?labelColor=27272A&logoColor=FFFFFF&style=for-the-badge&logo=github)](https://github.com/myparcelnl/vue-form-builder/pulls/)

## Features

- 

## Getting Started

Either [install `@myparcel/vue-form-builder` via your favorite package manager](#installation), or include the [CDN script tag](#cdn-usage) in your HTML.

### Installation

**Yarn**

```bash
yarn add @myparcel/vue-form-builder
```

**NPM**

```bash
npm install @myparcel/vue-form-builder
```

**pnpm**

```bash
pnpm add @myparcel/vue-form-builder
```

### CDN usage

```html
<script src="https://unpkg.com/browse/@myparcel/vue-form-builder"></script>
```

## Usage

### Creating a form and rendering it

`myForm.js`

```js
import { defineForm } from '@myparcel/vue-form-builder';

export const myForm = defineForm('my-form', {
  fields: [
    // Your fields
  ],
});
```

See [defining fields](#defining-fields) for more information about fields.

`MyComponent.vue`

```vue
<template>
  <MagicForm
    :form="form"
    @submit="onSubmit" />
</template>

<script>
import {MagicForm} from '@myparcel/vue-form-builder';
import {myForm} from './myForm';

export default defineComponent({
  components: {
    MagicForm,
  },

  setup: () => {
    return {
      myForm,
    };
  },
});
</script>
```

### Defining forms

A form is defined using the `defineForm` function. This function takes two arguments:

1. The name of the form
2. An object with the following properties:
    - `fields`: An array of fields

```js
```

### Defining fields

A field is defined using the `defineField` function. This function takes one argument; an object with the following properties:

**Required**

- `component`: The component to use for the field

**Optional**

- `name`: The name of the field
- `props`: The props to pass to the component
- One of the following:
    - `validator`: A function that takes the value of the field and returns a boolean. This goes together with the property `errorMessage`.
    - `validators`: An array of validators
    - `isValid`: A computed ref that returns a boolean

Fields are categorized into three types based on the passed options:

- `plainElement`: A field that is not a form element and may have a [name].
- `interactiveElement`: A field with a [name] and a ref to hold a reactive value.

```js
import { defineField } from '@myparcel/vue-form-builder';

const emailField = defineField({
  name: 'email',
  ref: ref(''),
  component: 'input',
  props: {
    type: 'email',
  },
});
```

### Interactive elements

To make a field reactive, you need to pass a name and a ref to the field. This ref will be used to hold the value of the field. The type of the ref will be used to determine the type of the field.

```ts
import {ref} from 'vue';

const emailField = defineField({
  name: 'firstName',
  component: 'input',
  ref: ref(''), // this is your ref
});
```

#### PlainElement hooks

Plain elements are components that are not form elements and do not have a [name]. They are used to create custom fields.

- `onClick`: Called when the field emits a `click` event

#### InteractiveElement hooks

- `onInput`: Called when the field emits an `input` event
- `onBlur`: Called when the field emits a `blur` event
- `onFocus`: Called when the field emits a `focus` event

#### Lifecycle hooks

You can use the following Vue hooks to hook into the lifecycle of a field:

- [`onCreated`](https://vuejs.org/api/options-lifecycle.html#created)
- [`onActivated`](https://vuejs.org/api/options-lifecycle.html#activated)
- [`onBeforeMount`](https://vuejs.org/api/options-lifecycle.html#beforemount)
- [`onBeforeUnmount`](https://vuejs.org/api/options-lifecycle.html#beforeunmount)
- [`onBeforeUpdate`](https://vuejs.org/api/options-lifecycle.html#beforeupdate)
- [`onDeactivated`](https://vuejs.org/api/options-lifecycle.html#deactivated)
- [`onMounted`](https://vuejs.org/api/options-lifecycle.html#mounted)
- [`onUnmounted`](https://vuejs.org/api/options-lifecycle.html#unmounted)
- [`onUpdated`](https://vuejs.org/api/options-lifecycle.html#updated)

Please refer to the [Vue Options Lifecycle documentation](https://vuejs.org/api/options-lifecycle.html) for more information on how these hooks work.

```ts

```

#### Validation

A [Validator] object looks like this:

```ts
import {Validator} from '@myparcel/vue-form-builder';

const validator: Validator = {
  validate: (instance, value) => true,
  errorMessage: 'This message is added to field.errors when the validator returns false',
}
```

The `validate` function takes two arguments:

1. The instance of the field: Field
2. The value of the field

You can pass validator(s) in three different ways:

- `validator` + `errorMessage`
- `validators`
- `isValid`

**validate**

If you only have one validator, you can choose to pass it directly to the field:

```ts
import {defineField} from '@myparcel/vue-form-builder';
import {ref} from 'vue';

const myField = defineField({
  name: 'myField',
  component: 'input',
  ref: ref(20),
  validate: (instance, value) => value > 10,
  errorMessage: 'This message is added to field.errors when the validator returns false',
});
```

**validators**

Multiple validators can be passed like this, an array of [Validator] objects:

```ts
import {defineField} from '@myparcel/vue-form-builder';
import {ref} from 'vue';

const myField = defineField({
  name: 'myField',
  component: 'input',
  ref: ref(''),
  validators: [
    {
      validate: (instance, value) => !value.toloLowerCase() === value,
      errorMessage: 'You must use at least one capital letter.',
    },
    {
      validate: (instance, value) => !value.includes('e'),
      errorMessage: 'The most common letter in the English language is not allowed, please be more creative.',
    },
  ],
});
```

**validator precedence**

In order to define specific validation functions, a `precedence` integer can be passed to a validator function to denote the priority of the validation to trigger, in order. This prevents from showing too many validation warnings at once, when they are not relevant (yet). Best shown in the following example:

```ts
import {defineField} from '@myparcel/vue-form-builder';
import {ref} from 'vue';

const myField = defineField({
  name: 'email',
  component: 'input',
  ref: ref(''),
  validators: [
    {
      precedence: 1
      validate: (instance, value) => validateEmail(value),
      errorMessage: 'The e-mail address is invalid',
    },
    {
      precedence: 2,
      validate: (field, value) => !String(value).includes('john.mack'),
      errorMessage: 'We do not send to John Mack',
    },
  ],
});
```

In the example, in order: the following errors are triggered:

1. (no input) => Field is required
2. ('a') => The e-mail address is invalid
3. ('john.mack@example.com') => We do not send to John Mack

This way, error nr 3 is not shown until error 2 is resolved, which is not shown until error 1 is resolved.

**isValid**

The `isValid` property accepts a computed ref that returns a boolean. This is useful when you want to use a computed property to determine the validity of the field.

```ts
import {defineField} from '@myparcel/vue-form-builder';
import {computed, ref} from 'vue';

const myField = defineField({
  name: 'myField',
  component: 'input',
  ref: ref(''),
  isValid: computed(() => {
    return !myField.value.includes('e');
  }),
});
```

### TypeScript

This library is written in TypeScript and has full support for it. You can use the types in your own code to get the best possible experience.

```ts
import {defineForm, defineField} from '@myparcel/vue-form-builder';

defineField({
  name: 'amount',
  component: 'input',
  ref: ref(1),
  validate: (
    instance, // The wrapping form instance
    value, // Inferred from the type of ref: number
  ) => value.length > 0,
});
```

[Validator]: #validation
