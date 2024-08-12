import { Controller, Get } from '@nestjs/common';
import CommonRequest from '../common/request';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
    constructor(
        private readonly commonRequest: CommonRequest,
        private readonly deckService: DeckService
    ) {}

    @Get()
    async getCards() {
        return await this.commonRequest.fetchApiCard();
    }

    @Get('commander')
    async chooseCommander() {
        return this.deckService.chooseCommander();
    }
}
