export default defineEventHandler(async (event) => {
  const isValidWebhook = await isValidGitHubWebhook(event)

  if (!isValidWebhook) {
    throw createError({ status: 401, message: 'Unauthorized: webhook is not valid' })
  }

  const body = await readBody(event)

  console.log('Received GitHub webhook event:', body)

  return { success: true, event: body.action }
})   