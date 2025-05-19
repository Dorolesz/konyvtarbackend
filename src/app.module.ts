import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [BookModule, RentalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
