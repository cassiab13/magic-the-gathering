import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeckController } from './deck/deck.controller';
import { DeckService } from './deck/deck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './deck/schema/deck.schema';
import CommonRequest from './common/request';
import { ChooseCommanderHandler } from './deck/handlers/chooseCommander.handler';
import { FilterCardsByColorHandler } from './deck/handlers/filterCardsByColor.handler';
import { SaveDeckHandler } from './deck/handlers/saveDeck.handler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env.development',
    }),
    MongooseModule.forRoot(`mongodb://0.0.0.0:27017/magic-the-gatering`),
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60min' }, 
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [DeckController],
  providers: [DeckService, CommonRequest, ChooseCommanderHandler, FilterCardsByColorHandler, SaveDeckHandler, AuthGuard],
})
export class AppModule {}
