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
        let labels = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

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

        cards.map((el) => {
            if (el.label.match(/^[JKQ]/)) {
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

    /**
     * checkWinner
     * Checks the winner
     */
    checkWinner(playerScore: number, iaScore: number, bet: number) {
        let diffMoney: number = 0;
        let message: string = '';
        let money: number = 0;
        // Rules
        if (playerScore > 21 ||
            (iaScore > playerScore && iaScore <= 21)) {
            message = 'You lose!';
            diffMoney = 0;
        } else if (playerScore > iaScore && playerScore <= 21) {
            message = 'You win!';
            diffMoney = 2 * bet;
        } else if (iaScore === playerScore) {
            message = 'Draw!';
            diffMoney = bet;
        }

        money += diffMoney;

        return {
            message: message,
            money: money,
            diffMoney: diffMoney
        };
    }

    blackjack(playerScore: number, iaScore: number, bet: number) {
        let diffMoney: number = 0;
        let message: string = '';
        let money: number = 0;
        let play: number = 0;

        if (playerScore === 21 && iaScore !== 21) {
            play = 2;
            message = 'Blackjack!';
            diffMoney = 2.5 * bet;
            money += diffMoney;
        } else if (iaScore === 21 && playerScore !== 21) {
            play = 2;
            message = 'You lose!';
            diffMoney = 0;
        } else if (playerScore === 21 && iaScore === 21) {
            play = 2;
            message = 'Draw!';
            diffMoney = bet;
            money += diffMoney;
        } else {
            play = 1;
        }

        return {
            play: play,
            message: message,
            money: money,
            diffMoney: diffMoney
        };
    }
}
