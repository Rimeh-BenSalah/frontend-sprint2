import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  livres : Livre[];
  livre! : Livre; 
  constructor() { 
    this.livres = [
    {idLivre : 1,  nomLivre : "Les Misérables",auteur :"Victor Hugo", prixLivre : 20.00,  Datedepublication : new Date("01/01/1862")},
    {idLivre : 2,  nomLivre : "Le Petit Prince", auteur :"Antoine de Saint-Exupéry",prixLivre :25.0, Datedepublication: new Date("06/04/1943")},
    {idLivre : 3,  nomLivre :"Madame Bovary", auteur :"Gustave Flaubert",prixLivre :22.0, Datedepublication: new Date("01/12/1957")}];
   }  
    listeLivres():Livre[] { 
      return this.livres; 
    }
    ajouterLivre( liv: Livre){
      this.livres.push(liv);
    }
    supprimerLivre( liv: Livre){ 
     //supprimer le livre liv du tableau livres  
      const index = this.livres.indexOf(liv, 0); 
      if (index > -1) { 
        this.livres.splice(index, 1); 
      }  
    }
    consulterLivre(id:number): Livre{
      this.livre =  this.livres.find(l => l.idLivre == id)!;
      return this.livre; }
    updateLivre( liv: Livre){
      //chercher le livre liv du tableau livres
      const index = this.livres.indexOf(liv, 0);
      if (index > -1) {
      this.livres.splice(index, 1); //supprimer l'ancien éléments
      this.livres.splice(index,0,liv); // insérer le nouvel élément
   } } 
}
