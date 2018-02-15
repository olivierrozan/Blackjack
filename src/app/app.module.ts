import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CardComponent } from './cards/cards.component';
import { CardService } from './cards/cards.service';
import { AppService } from './app.service';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.css';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, CardComponent],
    entryComponents: [CardComponent],
    providers: [CardService, AppService],
    bootstrap: [AppComponent]
})

export class AppModule {}
