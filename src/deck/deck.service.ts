import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CommonRequest from "src/common/request";
import { Deck } from "./schema/deck.schema";
import { Card } from "./schema/card.schema";

@Injectable()
export class DeckService {
    constructor(
        @InjectModel(Deck.name) private deckModel: Model<Deck>,
        private readonly commonRequest: CommonRequest
    ) { }

}