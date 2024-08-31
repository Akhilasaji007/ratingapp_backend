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

	public isProduction() {
		const mode = this.getValue("MODE", false);
		return mode === "production";
	}

	public getTypeOrmConfig(): TypeOrmModuleOptions {
		console.log("Connecting to - ", this.getValue("POSTGRES_HOST"));
		console.log(join(__dirname, "..", "..", "src", "migrations", "*.{ts,js}"));
		return {
			type: "postgres",
			host: this.getValue("POSTGRES_HOST"),
			port: parseInt(this.getValue("POSTGRES_PORT")),
			username: this.getValue("POSTGRES_USER"),
			password: this.getValue("POSTGRES_PASSWORD"),
			database: this.getValue("POSTGRES_DATABASE"),
			entities: [join(__dirname, "..", "..", "dist", "**", "*.entity.{ts,js}")],
			migrationsTableName: "migration",
			migrations: [
				join(__dirname, "..", "..", "src", "migrations", "*.{ts,js}"),
			],
			ssl: this.isProduction(),
			synchronize: false,
		};
	}
}

const configService = new ConfigService(process.env).ensureValues([
	"POSTGRES_HOST",
	"POSTGRES_PORT",
	"POSTGRES_USER",
	"POSTGRES_PASSWORD",
	"POSTGRES_DATABASE",
]);

export default configService.getTypeOrmConfig();
