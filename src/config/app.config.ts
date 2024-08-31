import { registerAs } from "@nestjs/config";

export default registerAs("APP_CONFIG", () => ({
	PORT: process.env.BACKEND_PORT || 5000,
	TOKEN_KEY: process.env.TOKEN_KEY || "",
}));
