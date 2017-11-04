import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

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
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },

    {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule',
        canActivate: [NotAuthGuard]
    },

    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
        canActivate: [NotAuthGuard]
    },

    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
    },

    {
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule',
        canActivate: [AuthGuard]
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