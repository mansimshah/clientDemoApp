import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { NavbarRoutingModule } from './navbar.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NavbarRoutingModule
    ],
    declarations: [
        NavbarComponent
    ]
})

export class NavbarModule {
}