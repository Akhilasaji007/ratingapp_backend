import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./config/app.config";
import devConfig from "./config/dev.config";
import stagConfig from "./config/stag.config";
import { join } from "path";
import * as os from "os";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig, devConfig, stagConfig],
			isGlobal: true,
			envFilePath: join(os.homedir(), "ratingapp_backend", `.env`),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
