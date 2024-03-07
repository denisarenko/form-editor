import {defineNuxtModule, createResolver, addComponentsDir, installModule} from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {},
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.css.push(resolve('./runtime/assets/css/article.css'))

    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
    })

    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      config: {
        content: {
          files: [
            resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolve('./runtime/*.{mjs,js,ts}')
          ]
        }
      }
    })

    await addComponentsDir({
      path: resolve('./runtime/components')
    })
  }
})
