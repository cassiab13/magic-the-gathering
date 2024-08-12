import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DeckController } from './deck/deck.controller';
import { DeckService } from './deck/deck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './deck/schema/deck.schema';
import CommonRequest from './common/request';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb://0.0.0.0:27017/magic-the-gatering`),
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
  ],
  controllers: [DeckController],
  providers: [DeckService, CommonRequest],
})
export class AppModule {}
