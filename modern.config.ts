import appTools, { defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'rspack'>({
  runtime: {
    router: true,
    state: true
  },
  // server: {
  //   ssr: true
  // },
  plugins: [
    appTools({
      bundler: 'experimental-rspack'
    })
  ]
});
