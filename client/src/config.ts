// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '12ikhob8v6'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'cb3-dev.us.auth0.com',            // Auth0 domain
  clientId: 'bjXgHWPJyftiMMdMoeRNsoTPTc1sAFcT',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
