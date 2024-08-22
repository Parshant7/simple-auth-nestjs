import { Global, Module } from '@nestjs/common';
import { CommonService, OtpService } from './common.service';

@Global()
@Module({
  providers: [CommonService, OtpService],
  exports: [CommonService, OtpService],
})
export class CommonModule {}
