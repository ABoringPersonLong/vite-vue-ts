module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: './',
    project: [
      'tsconfig.json',
      'tsconfig.node.json'
    ],
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  // 规则的值：
  // 'off' 或者 0 // 关闭规则
  // 'warn' 或者 1 // 在打开的规则作为警告（不影响退出代码）
  // 'error' 或者 2 // 把规则作为一个错误（退出代码触发时为1）
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时不能有 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时不能有 debugger
    'no-var': 2, // 禁止使用 var
    'no-mixed-spaces-and-tabs': 2, // 不能空格与 tab 混用
    'space-before-function-paren': 0, // 禁用函数小括号前加空格
    'vue/multi-word-component-names': 0, // 禁用多词组件名称
    'vue/html-indent': 2, // html 缩进 2 个空格
    'vue/max-attributes-per-line': [2, { 'singleline': 5 }], // 元素和属性为在一行显示时，最多只能有 5 个属性，多个属性要换行显示
    'vue/first-attribute-linebreak': 2, // 元素的属性如果换行显示，那么第一个属性前面也要换行
    'vue/html-closing-bracket-newline': 2, // 元素的属性如果换行显示，那么右括号 “>” 前面也要换行
    'vue/html-self-closing': 2, // 没有内容的元素必须改成自闭和标签
    'vue/html-closing-bracket-spacing': 2, // 自闭和元素的 / 前面必须加空格，如 <div />
    'vue/singleline-html-element-content-newline': 0, // 禁用在单行元素的内容之前和之后需要换行
    'vue/mustache-interpolation-spacing': 2, // 插值表达式之间要有 1 个空格的间距，如 {{ name }}
    '@typescript-eslint/indent': [2, 2], // ts 定义类型缩进 2 个空格
    '@typescript-eslint/space-before-function-paren': 0, // ts 禁用函数小括号前加空格
    '@typescript-eslint/no-unused-vars': 2, // 定义了类型必须使用
    '@typescript-eslint/no-explicit-any': 0, // 禁用不能使用 any 类型
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'], // 优先使用 interface 而不是 type
    '@typescript-eslint/promise-function-async': 0, // 禁用返回 promise 的函数必须是 async
    '@typescript-eslint/strict-boolean-expressions': 0 // 解决报错：ESLint: This rule requires the `strictNullChecks` compiler option to be turned on to function correc
  }
}
