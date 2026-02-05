export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  continent?: 'Europe' | 'America' | 'Africa' | 'Asia';
}
