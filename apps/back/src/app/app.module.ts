import { Module } from '@nestjs/common';
import { PetModule } from '../pet/pet.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
