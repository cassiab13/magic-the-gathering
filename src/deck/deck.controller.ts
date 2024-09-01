import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeckService } from './deck.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { Permission } from 'src/permissions/permissions.enum';
import { permission } from 'src/decorators/require.permission.decorators';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('deck')
export class DeckController {
    constructor(
        private readonly deckService: DeckService,
    ) {}

   
    @Get('create')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @permission({action: Permission.Create, subject: 'Deck'})
    async createDeck() {
        return this.deckService.createDeck();
    }
}
