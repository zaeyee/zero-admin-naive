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
  shortcuts: {
    'z-clickable': 'transition-colors duration-300 cursor-pointer hover:bg-#f5f5f5 active:bg-#eee',
    'z-icon-btn': 'z-clickable p-1.5 mx-1 text-0 rounded-full'
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
