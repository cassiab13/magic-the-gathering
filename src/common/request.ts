import { Card } from "../deck/schema/card.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class CommonRequest {
    private readonly apiUrl: string = `https://api.magicthegathering.io/v1/cards`;
    
    public async fetchApiCard(page: number): Promise<Card[]>{
        const url = `${this.apiUrl}?page=${page}`;
        console.log(url);
        const resultado = await this.fetchJson<{ cards: Card[] }>(url);
        return resultado.cards;
    }

    private getRandomInt() {
        
    }

    private async fetchJson<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (response) return response.json();
      }
}