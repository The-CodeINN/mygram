// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'es5',
    tabWidth: 2,
    singleQuote: true,
    tailwindAttributes: ['className'],
    tailwindFunctions: ['tw', 'clsx'],
    plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
    ],
}

module.exports = config
