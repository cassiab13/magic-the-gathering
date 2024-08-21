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
        const start = Date.now();
        await new this.deckModel(deck).save();
        const end = Date.now();

        if (this.nextHandler) await this.nextHandler.handle(deck);
        console.log("Tempo para salvar: ", (end - start)/1000)
    }
    
}