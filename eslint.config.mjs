import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react"; // Dành cho frontend React (nếu có)

export default [
  // Cấu hình cho backend
  {
    files: ["backend/**/*.js"], // Áp dụng cho tất cả các file JS trong backend
    languageOptions: {
      sourceType: "commonjs", // CommonJS cho Node.js
      globals: globals.node,  // Định nghĩa các biến toàn cục của Node.js
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "prettier/prettier": "error", // Lỗi nếu không tuân theo Prettier
    },
  },
  
  // Cấu hình cho frontend (nếu dùng React)
  {
    files: ["frontend/**/*.js", "frontend/**/*.jsx"], // Áp dụng cho file JS/JSX trong frontend
    languageOptions: {
      sourceType: "module", // ES module cho frontend
      globals: globals.browser,  // Các biến toàn cục cho trình duyệt
    },
    plugins: {
      prettier: prettierPlugin,
      react: pluginReact, // Plugin cho React
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules, // Quy tắc của React
      "prettier/prettier": "error", // Lỗi nếu không tuân theo Prettier
    },
  },
  
  prettierConfig, // Kết hợp Prettier với ESLint để đảm bảo format code chuẩn
];
