import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CommonRequest from "src/common/request";
import { Deck } from "./schema/deck.schema";

@Injectable()
export class DeckService {
    constructor(
        @InjectModel(Deck.name) private deckModel: Model<Deck>,
        private readonly commonRequest: CommonRequest
    ) { }
    
    async chooseCommander(){
        const cards = await this.commonRequest.fetchApiCard();
        const commanders = cards.filter(cards => cards.supertypes == 'Legendary')
        const randomCommander = commanders[Math.floor(Math.random() * commanders.length)];
        await this.saveCommanderToDeck(randomCommander);
    }

    private async saveCommanderToDeck(commander: any): Promise<void> {
        console.log(commander)
        const deck = new this.deckModel({
            commander: {
                name: commander.name,
                colorIdentity: commander.colorIdentity,
                supertypes: commander.supertypes,
                
            },
            cards: []
        });
        console.log(deck)
        await deck.save();
        console.log('Commander saved to deck:', commander.name)
    }
}