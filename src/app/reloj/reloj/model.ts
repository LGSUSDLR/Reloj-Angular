export interface RelojConfig {
  horaInicio: string; // "HH:mm:ss"
  colorNumeros: string;
  colorPuntos: string;
  colorManecillaHora: string;
  colorManecillaMinuto: string;
  colorManecillaSegundo: string;
  colorEtiqueta: string;
}
export interface Reloj extends RelojConfig {
  id: string;
  horaActual: string;
}
