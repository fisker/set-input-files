let getDataTransfer = () => new DataTransfer()

try {
  getDataTransfer()
} catch (_) {
  getDataTransfer = () => new ClipboardEvent('').clipboardData
}

function setInputFiles(input, files) {
  const dataTransfer = getDataTransfer()

  if (files && files.length > 0) {
    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < files.length; i += 1) {
      dataTransfer.items.add(files[i])
    }
  }

  input.files = dataTransfer.files
}

export default setInputFiles
