import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Theme } from '../model/theme.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ThemeWrapper } from '../model/themeWrapped';
import { Auth } from './auth';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root',
})
export class LivreService {
  apiURL: string = 'http://localhost:8081/livres/api';
  apiURLThe: string = 'http://localhost:8081/livres/api/the';
  apiURLTh: string = 'http://localhost:8081/livres/the';
  livres!: Livre[];
  themes!: Theme[];
  livre!: Livre;
  constructor(
    private http: HttpClient,
    public authService: Auth,
  ) {
    /*this.themes = [ {idThe : 1, nomThe : "Roman classique"}, {idThe : 2, nomThe : "Conte philosophique"}];*/
    /*this.livres = [
    {idLivre : 1,  nomLivre : "Les Misérables",auteur :"Victor Hugo", prixLivre : 20.00,  Datedepublication : new Date("01/01/1862"),
    theme: { idThe: 1, nomThe: "Roman classique" }},
    {idLivre : 2,  nomLivre : "Le Petit Prince", auteur :"Antoine de Saint-Exupéry",prixLivre :25.0, Datedepublication: new Date("06/04/1943"),
    theme: { idThe: 2, nomThe: "Conte philosophique" }},
    {idLivre : 3,  nomLivre :"Madame Bovary", auteur :"Gustave Flaubert",prixLivre :22.0, Datedepublication: new Date("01/12/1957"),
    theme: { idThe: 1, nomThe: "Roman classique" }}];*/
  }
  /*listeLivre(): Observable<Livre[]>{ 
    let jwt = this.authService.getToken(); 
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Livre[]>(this.apiURL+"/all",{headers:httpHeaders}); }*/
  listeLivre(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiURL + '/all');
  }

  ajouterLivre(liv: Livre): Observable<Livre> {
    /*let jwt = this.authService.getToken(); 
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Livre>(this.apiURL+"/addlivre", liv, {headers:httpHeaders});*/
    return this.http.post<Livre>(this.apiURL + '/addlivre', liv);
  }

  supprimerLivre(id: number) {
    const url = `${this.apiURL}/dellivre/${id}`;
    /*let jwt = this.authService.getToken(); 
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.delete(url, {headers:httpHeaders});*/
    return this.http.delete(url);
  }

  consulterLivre(id: number): Observable<Livre> {
    const url = `${this.apiURL}/getbyid/${id}`;
    /*let jwt = this.authService.getToken(); 
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Livre>(url,{headers:httpHeaders});*/
    return this.http.get<Livre>(url);
  }

  updateLivre(liv: Livre): Observable<Livre> {
    /*let jwt = this.authService.getToken(); 
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<Livre>(this.apiURL+"/updatelivre", liv, {headers:httpHeaders});*/
    return this.http.put<Livre>(this.apiURL + '/updatelivre', liv);
  }

  listeThemes(): Observable<ThemeWrapper> {
    /*let jwt = this.authService.getToken(); 
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<ThemeWrapper>(
      this.apiURLTh,{headers:httpHeaders});*/
    return this.http.get<ThemeWrapper>(this.apiURLTh);
  }

  consulterTheme(id: number): Theme {
    return this.themes.find((the) => the.idThe == id)!;
  }

  rechercherParTheme(idThe: number): Observable<Livre[]> {
    const url = `${this.apiURL}/livsthe/${idThe}`;
    return this.http.get<Livre[]>(url);
  }

  rechercherParNom(nom: string): Observable<Livre[]> {
    const url = `${this.apiURL}/livsByName/${nom}`;
    return this.http.get<Livre[]>(url);
  }

  ajouterTheme(the: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.apiURLThe, the, httpOptions);
  }
}
