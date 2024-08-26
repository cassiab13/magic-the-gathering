import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeckService } from './deck.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

@Controller('deck')
export class DeckController {
    constructor(
        private readonly deckService: DeckService
    ) {}

   
    @Get('create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.User)
   
    async createDeck() {
        return this.deckService.createDeck();
    }
}
