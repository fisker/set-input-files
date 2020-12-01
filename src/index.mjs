// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions
import createFileList from 'create-file-list/dist/create-file-list.mjs'

function setInputFiles(input, files) {
  input.files = createFileList(files)
}

export default setInputFiles
