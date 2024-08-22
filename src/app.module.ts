import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { DatabaseModule } from './common/modules/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from "dotenv"
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/modules/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from './modules/admin/admin.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      }
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    UserModule, DatabaseModule, AuthModule, CommonModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
