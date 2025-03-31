import { Routes } from '@angular/router';
import { ListCharacterComponent } from './pages/layout-home-page/list-character/list-character.component';

export const routes: Routes = [
    {
        path: 'home',
        component:ListCharacterComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
