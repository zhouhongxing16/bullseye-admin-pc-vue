module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-labels": ["error"], // 禁用出现未使用过的标
    "indent": [2, 2, { "SwitchCase": 1 }], // 两个空格缩进
    "no-mixed-spaces-and-tabs": 2, // 禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": [1, "smart-tabs"], // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    "comma-dangle": [1, "never"], // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "quotes": 0, // 强制使用一致的反勾号、双引号或单引号
    "spaced-comment": 0, // 强制在注释中 // 或 /* 使用一致的空格
    "no-const-assign": 2, // 禁止修改const声明的变量
    "no-dupe-args": 2, // 函数参数不能重复
    "no-multiple-empty-lines": [1, {"max": 2}], // 空行最多不能超过2行
    "no-trailing-spaces": 1, // 一行结束后面不要有空格
    "camelcase": 2, // 强制驼峰法命名
    "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
    /*'semi': [2, 'never'], // 不使用分号结尾*/
    'semi': [0],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    "linebreak-style": [0, "windows"], // 换行风格,
    "quotes": [1, "single"], // 引号类型 `` "" '',
    "prettier/prettier": "off"
  }
};
