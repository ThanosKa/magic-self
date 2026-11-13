import next from "eslint-config-next";

export default [
  ...next,
  { ignores: [".cloudflare/**", ".vinext/**", "dist/**"] },
];
