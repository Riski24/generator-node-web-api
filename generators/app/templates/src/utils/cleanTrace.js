// Cleans the stack trace, removing all external code references (node_modules)
export default function cleanStack(stack) {
  if (typeof stack !== 'string') {
    return stack
  }

  return stack
    .split(/(\r|\n)/)
    .filter(line => line.trim() && line.indexOf('node_modules') === -1)
    .join('\n')
}
