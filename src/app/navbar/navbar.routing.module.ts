import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavbarComponent}    from './navbar.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: NavbarComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class NavbarRoutingModule {
}