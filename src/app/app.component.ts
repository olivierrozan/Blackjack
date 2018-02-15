import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from './cards/cards.component';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    cards: any[];
    playerCards: any[];
    playerScore: number;
    iaCards: any[];
    iaScore: number;
    @ViewChild('oneCard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        console.log('Application Initialized!');

        this.cards = this.initDock();
        this.playerCards = [];
        this.iaCards = [];
        this.playerScore = 0;
        this.iaScore = 0;

        for (let i = 0; i < 2; i++) {
            this.playerCards.push(this.cards.shift());
        }

        for (let i = 0; i < 2; i++) {
            this.iaCards.push(this.cards.shift());
        }

        this.countScore();
    }

    initDock() {
        let cards = [];
        let colors = ['♠', '♥', '♦', '♣'];
        let labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

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

    shuffle(a: any[]) {
        let j, x;
        for (let i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }

    addCard() {
        this.playerCards.push(this.cards.shift());
        const factory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        this.countScore();
        ref.changeDetectorRef.detectChanges();
    }

    countScore() {
        this.playerScore = 0;
        this.playerCards.map( (el) => {
            if (el.label.match(/^[jkq]/)) {
                this.playerScore += 10;
            } else if (el.label === '1') {
                if (this.playerScore <= 10) {
                    this.playerScore += 11;
                } else {
                    this.playerScore++;
                }
            } else {
                this.playerScore += +el.label;
            }
        });
    }

    restart() {
        this.playerCards = [];

        for (let i = 0; i < 2; i++) {
            this.playerCards.push(this.cards.shift());
        }

        this.countScore();
    }
}
