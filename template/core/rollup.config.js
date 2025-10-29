import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const production = !process.env.ROLLUP_WATCH;

export default [
  // ES modules build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        inlineSources: !production
      }),
      production && terser()
    ],
    external: ['react', 'react-dom']
  },
  
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        inlineSources: !production
      }),
      production && terser()
    ],
    external: ['react', 'react-dom']
  },
  
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: '<%= sdkName %>',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        inlineSources: !production
      }),
      production && terser()
    ],
    external: ['react', 'react-dom']
  },
  
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];

