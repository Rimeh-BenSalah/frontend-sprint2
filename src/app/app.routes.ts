import { Routes } from '@angular/router';
import { Livres } from './livres/livres';
import { AddLivre } from './add-livre/add-livre';
import { UpdateLivre } from './update-livre/update-livre';
import { RechercheParTheme } from './recherche-par-theme/recherche-par-theme';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { ListeThemes } from './liste-themes/liste-themes';
import { UpdateTheme } from './update-theme/update-theme';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { livreGuard } from './livre-guard';

export const routes: Routes = [
    {path: "livres", component : Livres},
    {path: "add-livre", component : AddLivre, canActivate:[livreGuard]},
    {path: "", redirectTo: "livres", pathMatch: "full"},
    {path: "updateLivre/:id", component: UpdateLivre},
    {path: "rechercheParTheme", component : RechercheParTheme},
    {path: "rechercheParNom", component : RechercheParNom},
    {path: "listeThemes", component : ListeThemes},
    {path: "updateTheme", component : UpdateTheme},
    {path: 'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
];
