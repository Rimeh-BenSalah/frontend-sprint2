import { Component, OnInit } from '@angular/core';
import { Theme } from '../model/theme.model';
import { LivreService } from '../services/livre-service';
import { CommonModule } from '@angular/common';
import { UpdateTheme } from '../update-theme/update-theme';

@Component({
  selector: 'app-liste-themes',
  imports: [CommonModule,UpdateTheme],
  templateUrl: './liste-themes.html',
  styles: ``,
})
export class ListeThemes implements OnInit {
  themes! : Theme[]; 

  updatedThe : Theme = {"idThe":0,"nomThe":""};

  ajout:boolean=true;

  constructor(private livreService : LivreService) { } 
  ngOnInit(): void { this.livreService.listeThemes(). 
    subscribe(thes => {this.themes = thes._embedded.themes; 
      console.log(thes); });}
  themeUpdated(the:Theme){ 
    console.log("The updated event",the); 
    this.livreService.ajouterTheme(the). subscribe( ()=> 
      this.chargerThemes()); }
  chargerThemes(){
    this.livreService.listeThemes().
    subscribe(thes => {
      this.themes = thes._embedded.themes; 
      console.log(thes); }); }
  updateThe(the:Theme) { 
    this.updatedThe=the;
    this.ajout=false; 
  }

}
