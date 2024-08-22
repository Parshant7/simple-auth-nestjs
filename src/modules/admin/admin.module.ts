import {Module} from "@nestjs/common";
import { DatabaseModule } from "src/common/modules/database/database.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports: [DatabaseModule],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule{}