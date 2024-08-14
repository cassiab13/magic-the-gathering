import CommonRequest from "src/common/request";
import { DeckHandler } from "./deckHandler.interface";
import { Injectable } from "@nestjs/common";
import { Deck } from "../schema/deck.schema";

@Injectable()
class ChooseCommanderHandler implements DeckHandler {
    private nextHandler: DeckHandler;
    constructor(private readonly commonRequest: CommonRequest) { };

    setNext(handler: DeckHandler): DeckHandler {
        this.nextHandler = handler;
        return handler;
    }

    async handle(deck : Deck): Promise<void> {
        const commanders = (await this.commonRequest.fetchApiCard()).filter(cards => cards.supertypes.includes('Legendary'))
        deck.commander = commanders[Math.floor(Math.random() * commanders.length)];
        if (this.nextHandler) await this.nextHandler.handle(deck);
    }
}