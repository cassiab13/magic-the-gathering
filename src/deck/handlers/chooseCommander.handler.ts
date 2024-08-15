import CommonRequest from "src/common/request";
import { DeckHandler } from "./deckHandler.interface";
import { Injectable } from "@nestjs/common";
import { Deck } from "../schema/deck.schema";

@Injectable()
export class ChooseCommanderHandler implements DeckHandler {
    private nextHandler: DeckHandler;
    constructor(private readonly commonRequest: CommonRequest) { };

    setNext(handler: DeckHandler): DeckHandler {
        this.nextHandler = handler;
        return handler;
    }

    async handle(deck: Deck): Promise<void> {
        let commander: any;
        
        while(!commander){
        const cards = await this.commonRequest.fetchApiCard();
        const commanders = (cards || []).filter(card => 
            card && Array.isArray(card.supertypes) && card.supertypes.includes("Legendary")
        );
        commander = commanders[Math.floor(Math.random() * commanders.length)];
            deck.commander = commander;
        }
        if (this.nextHandler) await this.nextHandler.handle(deck);
    }
}
