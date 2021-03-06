/* eslint import/prefer-default-export: 0 */
type Palette = {
  [key: string]: string;
  primary: string;
  error: string;
  success: string;
}

export const palette: Palette = {
  primary: '#2185d0',
  white: '#ffffff',
  black: '#000000',
  error: 'red',
  success: '#16ab39',
}
