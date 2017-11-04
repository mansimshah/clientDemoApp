import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BlogRoutingModule
    ],
    declarations: [
        BlogComponent
    ]
})

export class BlogModule {
}