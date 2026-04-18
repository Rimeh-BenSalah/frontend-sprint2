import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { Theme } from '../model/theme.model';
import { LivreService } from '../services/livre-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-par-theme',
  imports: [CommonModule,FormsModule],
  templateUrl: './recherche-par-theme.html',
  styles: ``,
})
export class RechercheParTheme implements OnInit{
  livres!: Livre[];
  IdTheme! : number;
  themes! : Theme[];
[x: string]: any;
constructor(
    private livreService: LivreService,
    private router: Router,
  ) {}
ngOnInit(): void { 
  this.livreService.listeThemes(). 
  subscribe(thes => {this.themes = thes._embedded.themes; 
  console.log(thes); }); }
  onChange() { this.livreService.rechercherParTheme(this.IdTheme). 
    subscribe(livs =>{this.livres=livs}); }

}
