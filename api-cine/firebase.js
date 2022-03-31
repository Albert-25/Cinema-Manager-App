require('dotenv').config();
//GOOGLE_APPLICATION_CREDENTIALS=C:/Users/Víctor/Desktop/PF-Cine/api-cine/firebase.json
const {GOOGLE_APPLICATION_TYPE, GOOGLE_APPLICATION_PROJECT_ID, GOOGLE_APPLICATION_PRIVATE_KEY_ID, GOOGLE_APPLICATION_PRIVATE_KEY,   GOOGLE_APPLICATION_CLIENT_EMAIL,  GOOGLE_APPLICATION_CLIENT_ID, GOOGLE_APPLICATION_AUTH_URI,  GOOGLE_APPLICATION_TOKEN_URI, GOOGLE_APPLICATION_AUTH_PROVIDER_X509_CERT_URL, GOOGLE_APPLICATION_CLIENT_X509_CERT_URL} = require("./config.js");

const {initializeApp, applicationDefault} = require('firebase-admin/app')
const {getFirestore} = require('firebase-admin/firestore')
const admin = require('firebase-admin')

admin.initializeApp({
	credential: admin.credential.cert({
		type: GOOGLE_APPLICATION_TYPE,
		project_id: GOOGLE_APPLICATION_PROJECT_ID,
		private_key_id: GOOGLE_APPLICATION_PRIVATE_KEY_ID,
		private_key: GOOGLE_APPLICATION_PRIVATE_KEY,
		client_email: GOOGLE_APPLICATION_CLIENT_EMAIL,
		client_id: GOOGLE_APPLICATION_CLIENT_ID,
		auth_uri: GOOGLE_APPLICATION_AUTH_URI,
		token_uri: GOOGLE_APPLICATION_TOKEN_URI,
		auth_provider_x509_cert_url: GOOGLE_APPLICATION_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: GOOGLE_APPLICATION_CLIENT_X509_CERT_URL
	})
})

const db = getFirestore();

module.exports = { db }