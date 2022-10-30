var extension = /(?:\.([^.]+))?$/

const lagnuageByExtension = {
  html: 'html',
  css: 'css',
  scss: 'scss',
  py: 'python',
  js: 'javascript',
  ts: 'typescript',
  json: 'json',
  xml: 'xml',
}

export function getFileType(filename: string): string {
  console.log(extension.exec(filename)[1])
  return lagnuageByExtension[extension.exec(filename)[1]]
}
