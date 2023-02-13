export const successResult = (data: unknown) => ({
  code: 200,
  data
})

export const failResult = (msg: string) => ({
  code: 400,
  msg
})
