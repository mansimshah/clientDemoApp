import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditBlogComponent } from './edit-blog.component';
import { EditBlogRoutingModule } from './edit-blog.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        EditBlogRoutingModule
    ],
    declarations: [
        EditBlogComponent
    ]
})

export class EditBlogModule {
}