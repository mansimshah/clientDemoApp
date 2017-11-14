import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BlogRoutingModule
    ],
    declarations: [
        BlogComponent
    ]
})

export class BlogModule {
}