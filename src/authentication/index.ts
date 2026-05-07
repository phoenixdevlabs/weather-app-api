import type { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

	const apiKey = req.header("x-api-key");

	console.log("Received API key:", apiKey); // Log the received API key for debugging
	console.log("Expected API key:", process.env.API_KEY); // Log the expected API key for debugging
	console.log(apiKey === process.env.API_KEY); // Log the comparison result for debugging

	if (!apiKey || apiKey !== process.env.API_KEY) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	next();
};

export { authMiddleware };