import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

    // {
    //     path: '',
    //     loadChildren: './navbar/navbar.module#NavbarModule'
    // },

    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
    }
]

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ],
    providers: []
})
  
export class AppRoutingModule {}