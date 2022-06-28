const jwt = require('jsonwebtoken')

const generateToken = async (userData, secretSignature, tokenLife) => {
	try {
		return await jwt.sign(
			{
				userData,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
}

module.exports = generateToken;