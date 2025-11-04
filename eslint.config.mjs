import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: [
        ...nextCoreWebVitals,
        ...compat.extends("plugin:@typescript-eslint/recommended"),
        ...compat.extends("plugin:tailwindcss/recommended")
    ],

    plugins: {
        "@typescript-eslint": typescriptEslint,
        tailwindcss,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: true,
        },
    },

    settings: {
        tailwindcss: {
            callees: ["cn", "cva"],
            config: "./tailwind.config.ts",
            classRegex: "^(class(Name)?|tw)$",
        },

        next: {
            rootDir: ["./"],
        },
    },

    rules: {
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",

        "@typescript-eslint/consistent-type-imports": ["warn", {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
        }],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/require-await": "off",

        "@typescript-eslint/no-misused-promises": ["error", {
            checksVoidReturn: {
                attributes: false,
            },
        }],
    },
}]);