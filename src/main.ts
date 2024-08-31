import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as morgan from "morgan";
import { AppModule } from "./app.module";
import cors from "cors";

process.env.TZ = "Asia/Kolkata";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Middleware
	app.use(morgan("combined")); // Use the combined format

	// CORS configuration
	app.enableCors({
		origin: "*", // Consider restricting this in production
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	});

	const configService = app.get<ConfigService>(ConfigService);
	const PORT = configService.get<number>("APP_CONFIG.PORT");

	// Swagger setup
	const config = new DocumentBuilder()
		.setTitle("RatingApp Backend API")
		.setDescription("RatingApp Backend API")
		.setVersion("1.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	// Global Validation Pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Automatically strip properties that do not have decorators
			forbidNonWhitelisted: true, // Throw an error when non-whitelisted properties are present
			transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
		})
	);

	// Handle unhandled promise rejections
	process.on("unhandledRejection", (reason, promise) => {
		console.error("Unhandled Promise Rejection:", reason);
		// Optional: Integrate a logging service here for better tracking
	});

	process.on("SIGTERM", async () => {
		Logger.log("SIGTERM signal received: closing HTTP server", "Bootstrap");
		await app.close();
	});

	process.on("SIGINT", async () => {
		Logger.log("SIGINT signal received: closing HTTP server", "Bootstrap");
		await app.close();
	});

	// Start the application
	await app.listen(PORT, () => {
		Logger.log(`Server started at http://localhost:${PORT}/docs`, "Bootstrap");
	});
}

bootstrap();
