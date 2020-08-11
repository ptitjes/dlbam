export function sortBy<T, R>(array: T[], f: (element: T) => R) {
  const copy = [...array]
  return copy.sort((e1, e2) => {
    const v1 = f(e1)
    const v2 = f(e2)
    return v1 < v2 ? -1 : v1 === v2 ? 0 : 1
  })
}

export function throwError(message: string): never {
  throw new Error(message)
}
