import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import { EditBlogComponent } from './edit-blog.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: EditBlogComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class EditBlogRoutingModule {
}