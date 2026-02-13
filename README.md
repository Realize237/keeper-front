# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

---

## 🎨 Color System & Usage Guide

This project uses a semantic color system built on CSS variables and consumed by Tailwind via `@theme`.
Components never reference raw colors directly — they only use semantic tokens.

This ensures:

- ✅ Automatic dark / light mode support
- ✅ Consistent UI decisions
- ✅ No theme logic inside components

---

### 🧠 Core Principle

**Colors describe meaning, not appearance.**

❌ Avoid raw color classes:

```css
text-gray-400
bg-red-700
```

✅ Use semantic tokens instead:

```css
text-muted-foreground
bg-danger
```

> If you're thinking "light vs dark", you're already too low-level.

---

### 🎯 Base Semantic Tokens

#### Background & Text

| Token              | Purpose            | When to use               |
| ------------------ | ------------------ | ------------------------- |
| `background`       | App background     | Page body, layouts        |
| `foreground`       | Primary text color | Main content text         |
| `muted`            | Subtle background  | Hovers, disabled surfaces |
| `muted-foreground` | Secondary text     | Helper text, placeholders |
| `border`           | Neutral borders    | Inputs, cards, dividers   |
| `card`             | Elevated surfaces  | Cards, modals, dropdowns  |

---

### 🧩 Component-Specific Tokens

#### Primary Actions

| Token                | Use                           |
| -------------------- | ----------------------------- |
| `primary`            | Main CTA buttons              |
| `primary-foreground` | Text/icons on primary buttons |

**Examples:**

- Submit, Save, Continue

---

#### Destructive Actions

| Token               | Use                     |
| ------------------- | ----------------------- |
| `danger`            | Destructive backgrounds |
| `danger-foreground` | Text/icons on danger    |

**Examples:**

- Delete, Remove, Reset data

> ❗ Never use raw reds directly.

---

#### Feedback / Status

| Token                | Use                   |
| -------------------- | --------------------- |
| `success`            | Success states        |
| `success-foreground` | Text/icons on success |

**Examples:**

- Success messages, Confirmations, Completed states

---

### ✍️ Forms & Inputs

#### Input Background & Border

| Element          | Token                           |
| ---------------- | ------------------------------- |
| Input background | `bg-surface` or `bg-background` |
| Input text       | `text-foreground`               |
| Placeholder      | `text-muted-foreground`         |
| Border           | `border-border`                 |

#### Error States

| Element                     | Token           |
| --------------------------- | --------------- |
| Error text                  | `text-danger`   |
| Error border                | `border-danger` |
| Error background (optional) | `bg-danger/10`  |

---

### 🔘 Buttons (Intent-Based)

Buttons are defined by intent, not color.

| Variant       | Meaning                      |
| ------------- | ---------------------------- |
| `primary`     | Main action                  |
| `secondary`   | Alternative / neutral action |
| `destructive` | Dangerous action             |
| `ghost`       | Low-emphasis action          |

> Dark/light mode is handled automatically via tokens.

---

### 🌓 Dark & Light Mode

Theme switching works by changing CSS variables only.

- ✅ Components do not branch on theme
- ✅ Components do not use `dark:` classes
- ✅ Components do not hardcode colors

> If a component needs `-dark` or `-light`, the token is wrong.

---

### 🚫 Anti-Patterns (Do Not Do This)

```css
bg-red-700
text-gray-400
dark:bg-black
hover:bg-white
```

Instead use semantic tokens:

```css
bg-danger
text-muted-foreground
hover:bg-muted
```

---

### ✅ Summary Rules

1. Use semantic tokens only
2. Let themes decide the actual colors
3. Components express intent
4. Never hardcode colors in components
5. If it looks wrong in dark mode, fix the token, not the component
