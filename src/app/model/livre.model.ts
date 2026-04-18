import { Theme } from "./theme.model";

export class Livre { 
idLivre? : number | undefined; 
nomLivre? : string; 
auteur?: string;
prixLivre? : number; 
datedepublication?: Date;
theme! : Theme;
} 