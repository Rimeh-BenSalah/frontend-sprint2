import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre-service';

@Component({
  selector: 'app-livres',
  imports: [CommonModule,RouterLink],
  templateUrl: './livres.html',
  styleUrl: './livres.css',
})
export class Livres implements OnInit{
  livres: Livre[];  

  constructor(private livreService: LivreService) {
    /*this.livres = [
    {idLivre : 1,  nomLivre : "Les Misérables",auteur :"Victor Hugo", prixLivre : 20.00,  Datedepublication : new Date("01/01/1862")},
    {idLivre : 2,  nomLivre : "Le Petit Prince", auteur :"Antoine de Saint-Exupéry",prixLivre :25.0, Datedepublication: new Date("06/04/1943")},
    {idLivre : 3,  nomLivre :"Madame Bovary", auteur :"Gustave Flaubert",prixLivre :22.0, Datedepublication: new Date("01/12/1957")}];*/
    this.livres = livreService.listeLivres();
  }
  ngOnInit(): void {
    
  }
  supprimerLivre(l: Livre) { 
    //console.log(l);
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) 
    this.livreService.supprimerLivre(l); }
}
