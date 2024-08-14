import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema({timestamps: true})
export class Card {
    @Prop({ required: true })
    name: string;
    
    @Prop({ type: [String], default: [] })
    colorIdentity: string[];

    @Prop({ type: [String], default: [] })
    type: string[];

    @Prop({ type: [String] })
    supertypes: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);