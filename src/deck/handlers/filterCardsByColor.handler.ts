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
        deck.cards = [];
        const cardsToDeck = (newCards: Card[]) => {
            const existingIds = new Set(deck.cards.map(card => card.name));
            const verifiedCards = newCards.filter(card => !existingIds.has(card.name));
            deck.cards.push(...verifiedCards);
        };
   
        while (deck.cards.length < 99) {
            const cards = await this.commonRequest.fetchApiCard();
            const filteredCards = cards
                .filter(card => card.colorIdentity && card.colorIdentity
                    .some(color => deck.commander.colorIdentity.includes(color)));
   
        cardsToDeck(filteredCards);
        deck.cards = deck.cards.slice(0, 99);
    }
   
        if (this.nextHandler) {
            await this.nextHandler.handle(deck);
        }
    }
}