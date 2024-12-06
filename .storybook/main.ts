import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.module?.rules) {
      const rules = config.module.rules as Array<any>
      const scssRule = rules.find((rule) => rule.test && rule.test.toString().includes('scss'))
      const imageRule = config.module?.rules?.find((rule) => {
        const test = (rule as { test: RegExp }).test

        if (!test) {
          return false
        }

        return test.test('.svg')
      }) as { [key: string]: any }

      imageRule.exclude = /\.svg$/

      config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      if (scssRule) {
        const sassLoader = scssRule.use.find(
          (loader: any) => loader && loader.loader && loader.loader.includes('sass-loader')
        )

        if (sassLoader) {
          sassLoader.options = {
            ...sassLoader.options,
            additionalData: `
              @import "@/shared/styles/base/variables";
              @import "@/shared/styles/base/mixins";
              @import "@/shared/styles/base/functions";
            `,
            sassOptions: {
              includePaths: [path.resolve(__dirname, '..')],
            },
          }
        }
      }
    }

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '..'),
      }
    }

    return config
  },
}

export default config
