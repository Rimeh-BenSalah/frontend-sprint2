import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '../model/theme.model';
import { LivreService } from '../services/livre-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-theme',
  imports: [FormsModule],
  templateUrl: './update-theme.html',
  styles: ``,
})
export class UpdateTheme implements OnInit{
  @Input() 
  theme! : Theme;

  @Input() 
  ajout!:boolean;

  @Output() 
  themeUpdated = new EventEmitter<Theme>();


  constructor(private livreService : LivreService) { } 
    ngOnInit(): void {
      console.log("ngOnInit du composant UpdateTheme ",this.theme);
    }
    saveTheme(){ 
      this.themeUpdated.emit(this.theme); 
    }
    

}
