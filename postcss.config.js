// postcss.config.js
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    cssnano({ preset: 'default' }),
    autoprefixer(),
  ]
};