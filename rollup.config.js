import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

// PostCSS plugins
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
    postcss(require('./postcss.config')),
    uglify(),
  ],
};
