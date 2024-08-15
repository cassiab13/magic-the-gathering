import { SaveDeckHandler } from './handlers/saveDeck.handler';
import { Injectable } from "@nestjs/common";
import { ChooseCommanderHandler } from "./handlers/chooseCommander.handler";
import { FilterCardsByColorHandler } from "./handlers/filterCardsByColor.handler";
import { Deck } from './schema/deck.schema';


@Injectable()
export class DeckService {
    constructor(
        private readonly chooseCommanderHandler: ChooseCommanderHandler,
        private readonly filterCardsByColor: FilterCardsByColorHandler,
        private readonly saveDeck: SaveDeckHandler
    ) { }
    
    async createDeck() {
        const deck = new Deck();

        this.chooseCommanderHandler
            .setNext(this.filterCardsByColor)
            .setNext(this.saveDeck);
        
        await this.chooseCommanderHandler.handle(deck);
    }
}