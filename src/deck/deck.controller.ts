import { Controller, Get } from '@nestjs/common';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
    constructor(
        private readonly deckService: DeckService
    ) {}

    @Get('cards')
    async getCardsToDeck(color: String[]) {
        return this.deckService.getCardsToDeck();
    }

    @Get('commander')
    async chooseCommander() {
        return this.deckService.chooseCommander();
    }
}
