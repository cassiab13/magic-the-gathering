import { Card } from "../deck/schema/card.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class CommonRequest {
    private readonly apiUrl: string = `https://api.magicthegathering.io/v1/cards`;
    
    public async fetchApiCard(): Promise<Card[]>{
        try{
        const url = `${this.apiUrl}?page=${this.getRandomPage()}`;
        const resultado = await this.fetchJson<{ cards: Card[] }>(url);
            return resultado.cards;
        } catch (error) {
            console.log(error);       
        }
    }
    private getRandomPage(): number {
        return Math.floor(Math.random() * (100 - 1) + 1);

    }
    private async fetchJson<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (response) return response.json();
    }
    
}