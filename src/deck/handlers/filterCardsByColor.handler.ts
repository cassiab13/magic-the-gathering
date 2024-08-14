import { Injectable } from "@nestjs/common";
import { DeckHandler } from "./deckHandler.interface";
import CommonRequest from "src/common/request";
import { Deck } from "../schema/deck.schema";

@Injectable()
class filterCardsByColor implements DeckHandler {
    private nextHandler: DeckHandler;
    constructor(private readonly commonRequest: CommonRequest) { }
    
    setNext(handler: DeckHandler): DeckHandler {
        this.nextHandler = handler;
        return handler;
    }

    async handle(deck: Deck): Promise<void>{
        const filteredCards = (await this.commonRequest.fetchApiCard()).
            filter(card => card.colorIdentity
                .some(color => deck.commander.colorIdentity.includes(color)));
        deck.cards = Array.from(new Set(filteredCards)).slice(0, 99);

        if (this.nextHandler) {
            await this.nextHandler.handle(deck);
        }
    }
}