import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

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
    },

    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },

    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
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