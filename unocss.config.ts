import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',
        'vertical-align': 'middle'
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
