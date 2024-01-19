export default {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    './.eslintrc-auto-import.json'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'eqeqeq': 'warn', // 要求使用 === 和 !==
    'semi': 'off', // 要求或禁止使用分号代替 ASI
    'indent': ['error', 2], // 强制使用一致的缩进
    'quotes': ['error', 'single'], // 强制使用一致的反勾号、双引号或单引号
    'arrow-spacing': 'error', // 强制箭头函数的箭头前后使用一致的空格
    'no-unused-vars': [ // 禁止出现未使用过的变量
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
  }
}