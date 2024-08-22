import { userSchema } from "./models/user.model";
import { otpSchema } from "./models/otp.model";
import { sessionSchema } from "./models/session.model";
import { Module,Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseService } from "./database.service";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "sessions", schema: sessionSchema },
            { name: "otps", schema: otpSchema},
            { name: "users", schema: userSchema},
        ]),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule{};