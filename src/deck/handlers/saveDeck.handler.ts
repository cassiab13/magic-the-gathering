import { InjectModel } from "@nestjs/mongoose";
import { DeckHandler } from "./deckHandler.interface";
import { Deck } from "../schema/deck.schema";
import { Model } from "mongoose";

export class SaveDeckHandler implements DeckHandler {
    private nextHandler: DeckHandler;

    constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) { }
    
    setNext(handler: DeckHandler): DeckHandler {
        this.nextHandler = handler;
        return handler;
    }

    async handle(deck: Deck): Promise<void>{
        await new this.deckModel(deck).save();

        if (this.nextHandler) await this.nextHandler.handle(deck);
    }
}