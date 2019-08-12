import {terser} from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const input = 'src/index.js'
const name = 'setInputFiles'
const filename = 'set-input-files'
const plugins = [babel(), resolve()]

const umdBuild = {
  input,
  output: {
    file: `lib/${filename}.js`,
    format: 'umd',
    name,
  },
  plugins,
}

const esmBuild = {
  input,
  output: {
    file: `lib/${filename}.mjs`,
    format: 'esm',
  },
  plugins,
}

function minify(bundle) {
  let {input, output, plugins} = bundle
  output = {
    ...output,
    file: output.file.replace(/\.(m?js)$/, '.min.$1'),
  }
  plugins = [...plugins, terser()]
  return {
    input,
    output,
    plugins,
  }
}

const builds = [umdBuild, esmBuild]

export default [...builds, ...builds.map(minify)]
