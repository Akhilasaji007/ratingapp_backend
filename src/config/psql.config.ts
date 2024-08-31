import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import "dotenv/config";

class ConfigService {
	constructor(private env: { [k: string]: string | undefined }) {}

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.env[key];
		if (!value && throwOnMissing) {
			throw new Error(`config error - missing env.${key}`);
		}
		return value;
	}

	public ensureValues(keys: string[]) {
		keys.forEach((k) => this.getValue(k, true));
		return this;
	}

	public getPort() {
		return this.getValue("PORT", true);
	}

	public getRedisUse() {
		return this.getValue("REDIS_USE");
	}

	public getRedishost() {
		return this.getValue("REDIS_HOST");
	}

	public isProduction() {
		// const mode = this.getValue('MODE', false);
		const mode = false;
		return false;
	}

	public getTypeOrmConfig(): TypeOrmModuleOptions {
		console.log("Connecting to - ", this.getValue("POSTGRES_HOST"));
		return {
			type: "postgres",
			host: this.getValue("POSTGRES_HOST"),
			port: parseInt(this.getValue("POSTGRES_PORT")),
			username: this.getValue("POSTGRES_USER"),
			password: this.getValue("POSTGRES_PASSWORD"),
			database: this.getValue("POSTGRES_DATABASE"),
			entities: [
				join(__dirname, "**", "../", "../", "*", "entity", "*.entity.{ts,js}"),
			],
			migrationsTableName: "migration",
			migrations: ["src/migration/*.ts"],
			ssl: this.isProduction(),
			synchronize: true,
		};
	}
}

const configService = new ConfigService(process.env).ensureValues([
	"POSTGRES_HOST",
	"POSTGRES_PORT",
	"POSTGRES_USER",
	"POSTGRES_PASSWORD",
	"POSTGRES_DATABASE",
	"REDIS_USE",
	"REDIS_HOST",
]);

export { configService };
