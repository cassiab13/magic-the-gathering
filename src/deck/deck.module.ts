import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckService } from './deck.service';
import { Deck, DeckSchema } from './schema/deck.schema';
import CommonRequest from '../common/request';

@Module({
  imports: [MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }])],
  providers: [DeckService, CommonRequest],
  exports: [DeckService],
})
export class DeckModule {}
