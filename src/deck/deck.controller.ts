import { Controller, Get } from '@nestjs/common';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
    constructor(
        private readonly deckService: DeckService
    ) {}

   
    @Get('create')
    async createDeck() {
        return this.deckService.createDeck();
    }
}
