// 是否外链
export const isExternal = (path: string) => {
  return /^(https?|mailto|tel):/.test(path)
}
