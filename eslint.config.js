// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  eslint.configs.recommended,
  eslintPlugin.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['*.js', '*.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['dist', 'node_modules', 'public'],
  },
);
