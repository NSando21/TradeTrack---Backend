import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { databaseConfig } from "./config/database.config";
import { mailConfig } from "./config/mail.config";
import { TripsModule } from "./modules/trips/trips.module";
import { ProviderModule } from "./modules/providers/providers.module";
import { ProductsModule } from "./products/products.module";
import { AuthModule } from './modules/auth/auth.module';
import { FileUploadModule } from "./modules/file-upload/file-upload.module";

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development",
    }),

    // Configuración de base de datos
    TypeOrmModule.forRoot(databaseConfig),

    // Configuración de email
    MailerModule.forRoot(mailConfig),

    // Módulos de la aplicación
    UsersModule,
    TripsModule,
    ProviderModule,
    ProductsModule,
    AuthModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
