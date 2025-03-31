import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ListCharacterComponent } from './pages/layout-home-page/list-character/list-character.component';
import { CharacterComponent } from './pages/character/character.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    {
        path: 'home',
        component:ListCharacterComponent
    },
    {
        path:'character/:id',
        component:CharacterComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];
