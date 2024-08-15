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
        const page = Math.floor(Math.random() * (100 - 1) + 1);
        const cards = await this.commonRequest.fetchApiCard(page);
        const commanders = (cards || []).filter(card => 
            card && Array.isArray(card.supertypes) && card.supertypes.includes("Legendary")
        );
        console.log(commanders.length)
        commander = commanders[Math.floor(Math.random() * commanders.length)];
            deck.commander = commander;
            console.log(deck.commander)
        }
        if (this.nextHandler) await this.nextHandler.handle(deck);
    }
}
/*TODO
Tá dando erro no filterCardsByColor. 
Acho que resolvi o problema do commander undefined - refatorar*/