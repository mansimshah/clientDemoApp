const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
	// the database url to connect
	url : 'mongodb://127.0.0.1:27017/meanstack-app',
	secret: crypto
}