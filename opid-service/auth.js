import { google } from 'googleapis'
import fs from 'fs'
// https://developers.google.com/identity/protocols/oauth2/web-server#node.js

const configText = fs.readFileSync('./google-config.json').toString()
const googleConfig = JSON.parse(configText)
export const oauth2Client = new google.auth.OAuth2({
  clientId: googleConfig.web.client_id,
  clientSecret: googleConfig.web.client_secret,
  redirectUri: 'http://localhost:3000/oauth2callback',
})
const scopes = ['https://www.googleapis.com/auth/drive.metadata.readonly']

export const authorizationUrl = oauth2Client.generateAuthUrl({
  scope: scopes,
  include_granted_scopes: true,
})

export const getEmail = async (tokens) => {
  const decoded = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: googleConfig.web.client_id,
  })
  return decoded.payload.email
}

export const getToken = (code) => oauth2Client.getToken(code)
