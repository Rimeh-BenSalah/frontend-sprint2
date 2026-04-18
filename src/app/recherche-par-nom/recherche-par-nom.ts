import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre-service';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule, CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``,
})
export class RechercheParNom implements OnInit {
  nomLivre! : string; 
  livres!: Livre[];
  allLivres! : Livre[]; 
  searchTerm!: string;
  constructor(private livreService : LivreService) { }
  ngOnInit(): void {
    /*this.livreService.listeLivre().
    subscribe(livs => { 
      console.log(livs); 
      this.livres = livs; }); */
      /*this.livreService.listeLivre().subscribe(livs => { console.log(livs); 
        this.allLivres = livs; });*/
        this.livreService.listeLivre().subscribe(livs => { 
          console.log(livs); 
          this.livres = livs; });
    }
    rechercherLivs(){ 
    if (this.nomLivre)
      this.livreService.rechercherParNom(this.nomLivre). 
      subscribe(livs => {  
        this.livres=livs;
        console.log(livs); 
      }); 
      else this.livreService.listeLivre().subscribe((livs) => { 
        console.log(livs); 
        this.livres = livs; });
    }
    onKeyUp(filterText : string){ 
      this.livres = this.allLivres.filter(item => 
        item.nomLivre?.toLowerCase().includes(filterText)); }
}
