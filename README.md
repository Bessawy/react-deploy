# Getting Started with React Components & React Hooks

- Application for balance management.

## Requirements

1. Create a simple one-page application to store incomes and expenses, and set
saving target.
2. Account balance can be calculated from incomes, expenses, and saving.
`incomes - expenses + saving = balance`
3. Users should be able to add new incomes, expenses, transfer from balance account to saving account, and reset saving target. Balance should never be negative number.
4. Use React Hooks where applicable. TypeScript must be used at least for the props types.
5. Decide your own styling (The image has no style)

## Technology

1. Typescript
2. React
3. Sass
4. d3- for piecharts

## References



## File structure

```
└───src
    │   App.css
    │   App.tsx
    │   index.css
    │   index.tsx
    │
    ├───components
    │       Expense.tsx
    │       Graphs.tsx
    │       Main.tsx
    │       Savings.tsx
    │       Source.tsx
    │
    ├───sass
    │       _charts.scss
    │       _expense.scss
    │       _main.scss
    │       _saving.scss
    │       _source.scss
    │       _styles.scss
    │
    ├───types
    │       Expense.ts
    │       Savings.ts
    │       Source.ts
    │
    └───utils
            utils.ts
```