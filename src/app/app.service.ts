import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    /**
     * initDock
     * Inits the dock and shuffle the cards
     * Without shuffling the cards are ordered asc
     */
    initDock() {
        let cards = [];
        let colors = ['♠', '♥', '♦', '♣'];
        let labels = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

        for (let k = 0; k < 6; k++) {
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 4; j++) {
                    cards.push({ label: labels[i], color: colors[j] });
                }
            }
        }

        this.shuffle(cards);

        return cards;
    }
    /**
     * shuffle
     * @param a
     * Shuffles the deck
     */
    shuffle(a: any[]) {
        let j, x;
        for (let i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }
    /**
     * countScore
     * Increments values of cards
     */
    countScore(cards: any[]): number {
        let score = 0;

        cards.map( (el) => {
            if (el.label.match(/^[jkq]/)) {
               score += 10;
            } else if (el.label === 'A') {
                if (score <= 10) {
                   score += 11;
                } else {
                   score++;
                }
            } else {
               score += +el.label;
            }
        });

        return score;
    }
    /**
     * dealCards
     * @param dock
     * Give the 2 first cards to player and dealer
     */
    dealCards(dock: any[]): any {
        let cards = [];

        for (let i = 0; i < 2; i++) {
            cards.push(dock.shift());
        }

        return {
            'cards': cards,
            'dock': dock
        };
    }
}
