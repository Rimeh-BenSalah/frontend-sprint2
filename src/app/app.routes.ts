import { Routes } from '@angular/router';
import { Livres } from './livres/livres';
import { AddLivre } from './add-livre/add-livre';
import { UpdateLivre } from './services/update-livre/update-livre';

export const routes: Routes = [
    {path: "livres", component : Livres},
    {path: "add-livre", component : AddLivre},
    {path: "", redirectTo: "livres", pathMatch: "full"},
    {path: "updateLivre/:id", component: UpdateLivre}
];
