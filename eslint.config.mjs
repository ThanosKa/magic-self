import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  { ignores: [".cloudflare/**", ".vinext/**", "dist/**"] },
];

export default eslintConfig;
