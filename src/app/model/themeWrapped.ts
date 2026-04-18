import { Theme } from './theme.model';

export class ThemeWrapper {
  _embedded!: { themes: Theme[] };
}
