import { Injectable } from "@nestjs/common";
import { DeckHandler } from "./deckHandler.interface";
import CommonRequest from "src/common/request";
import { Deck } from "../schema/deck.schema";
import { Card } from "../schema/card.schema";

@Injectable()
export class FilterCardsByColorHandler implements DeckHandler {
    private nextHandler: DeckHandler;
    constructor(private readonly commonRequest: CommonRequest) { }
    
    setNext(handler: DeckHandler): DeckHandler {
        this.nextHandler = handler;
        return handler;
    }

    async handle(deck: Deck): Promise<void>{
       while (deck.cards.length < 99) {
    console.log(deck.commander.colorIdentity)
    const page = Math.floor(Math.random() * (100 - 1) + 1);
    const cards = await this.commonRequest.fetchApiCard(page);
    const filteredCards = cards
        .filter(card => card.colorIdentity && card.colorIdentity.some(color => deck.commander.colorIdentity.includes(color)));
deck.cards = deck.cards.slice(0, 99);

    console.log(`Número de cards no deck: ${deck.cards.length}`);
}

console.log('Deck completo com cards:', deck.cards.length);

        if (this.nextHandler) {
            await this.nextHandler.handle(deck);
        }
    }
}