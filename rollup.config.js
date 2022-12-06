import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

// PostCSS plugins
import cssnano from 'cssnano';
import cssnext from 'postcss-cssnext';
import nested from 'postcss-nested';
import simplevars from 'postcss-simple-vars';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    // {
    //   file: pkg.module,
    //   format: 'es',
    // },
  ],
  inlineDynamicImports: true,
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      clean: true,
      tsconfig: 'tsconfig-rollup.json',
      typescript: require('typescript'),
    }),
    postcss({
      plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
      extensions: ['.css'],
    }),
    uglify(),
  ],
};
