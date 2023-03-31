export const successResult = (data: unknown, message = 'success') => ({
  code: 200,
  message,
  data
})

export const failResult = (message: string, code = 400) => ({
  code,
  message
})
