import { Prop,SchemaFactory, Schema } from "@nestjs/mongoose";
import { Card } from "./card.schema";
import { HydratedDocument } from "mongoose";
import { User } from "src/users/schema/user.schema";

export type DeckDocument = HydratedDocument<Deck>;

@Schema({ timestamps: true })
export class Deck {
    @Prop({
        type: {
            name: { type: String },
            colorIdentity: { type: [String], default: [] },
            supertypes: { type: [String], default: [] }            
        }
    })
    commander: {
        name: string;
        colorIdentity: string[];
        supertypes: string[];
    };

    @Prop({ type: [Card], default: [] })
    cards: Card[];
    deck: any[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);