import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeckService } from './deck.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('deck')
export class DeckController {
    constructor(
        private readonly deckService: DeckService
    ) {}

   
    @Get('create')
    @UseGuards(AuthGuard)
    async createDeck() {
        return this.deckService.createDeck();
    }
}
