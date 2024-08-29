// postcss.config.js
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    cssnano({ preset: 'default' }),
    purgecss({
      content: ['./**/*.html', './**/*.scss']
    }),
    autoprefixer(),
  ]
};