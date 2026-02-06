import { configApp } from '@adonisjs/eslint-config'
export default configApp({
  rules: {
    '@unicorn/no-for-loop': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
})
