import { Deck } from "../schema/deck.schema";

export interface DeckHandler {
    setNext(handler: DeckHandler): DeckHandler;
    handle(deck: Deck): Promise<void>;
}