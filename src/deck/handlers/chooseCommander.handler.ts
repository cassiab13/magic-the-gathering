import CommonRequest from "../../common/request";
import { DeckHandler } from "./deckHandler.interface";
import { Injectable } from "@nestjs/common";
import { Deck } from "../schema/deck.schema";

@Injectable()
export class ChooseCommanderHandler implements DeckHandler {
    private nextHandler: DeckHandler;
    constructor(
        private readonly commonRequest: CommonRequest) { };

    setNext(handler: DeckHandler): DeckHandler {
        this.nextHandler = handler;
        return handler;
    }

    async handle(deck: Deck): Promise<void> {
        const start = Date.now()
        let commander: any;
        
        while(!commander){
        const cards = await this.commonRequest.fetchApiCard();
        const commanders = (cards || []).filter(card => 
            card && Array.isArray(card.supertypes) && card.supertypes.includes("Legendary")
        );
        commander = commanders[Math.floor(Math.random() * commanders.length)];
            deck.commander = commander;
        }
        const end = Date.now();
        if (this.nextHandler) await this.nextHandler.handle(deck);

        console.log("Tempo da requisição - escolher commander: ", (end - start) / 1000);
    }
}
