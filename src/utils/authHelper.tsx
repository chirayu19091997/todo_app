import * as jose from "jose";
const secretKey = new TextEncoder().encode(
	process.env.NEXT_PUBLIC_IMAGE_JWT_SECERT
);

const signToken = async (payload: any) => {
	try {
		const token = await new jose.SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" }) // algorithm
			.setIssuer("urn:example:issuer")
			.setAudience("urn:example:audience")
			.setExpirationTime("1 day") // token expiration time, e.g., "1 day"
			.sign(secretKey); // secretKey generated from previous step
		return token;
	} catch (err) {}
};

const verifyToken = async (token: string) => {
	try {
		const { payload, protectedHeader } = await jose.jwtVerify(
			token,
			secretKey,
			{
				issuer: "urn:example:issuer",
				audience: "urn:example:audience",
			}
		);
		console.log(protectedHeader);
		console.log(payload);
		return { payload, protectedHeader };
	} catch (err) {}
};

export { signToken, verifyToken };
