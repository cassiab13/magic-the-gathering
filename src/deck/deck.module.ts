import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckService } from './deck.service';
import { Deck, DeckSchema } from './schema/deck.schema';
import CommonRequest from '../common/request';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [MongooseModule.forFeature(
    [{ name: Deck.name, schema: DeckSchema }]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60min' },
    }),
  }),
],
  providers: [DeckService, CommonRequest, AuthGuard],
  exports: [DeckService],
})
export class DeckModule {}
