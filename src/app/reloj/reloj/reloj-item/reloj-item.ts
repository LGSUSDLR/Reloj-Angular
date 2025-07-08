import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reloj } from '../model';

@Component({
  selector: 'app-reloj-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-item.html',
  styleUrls: ['./reloj-item.css'],
})
export class RelojItemComponent {
  @Input() reloj!: Reloj;
  @Output() onEditar = new EventEmitter<Reloj>();

  showEdit = false;

  size = 200;
  numeros = Array.from({ length: 12 }, (_, i) => i + 1);
  marcas = Array.from({ length: 60 }, (_, i) => i);

  getNumeroX(n: number) {
    const radio = 62;
    const angle = ((n - 3) * 30) * Math.PI / 180;
    return 100 + Math.cos(angle) * radio;
  }
  getNumeroY(n: number) {
    const radio = 62;
    const angle = ((n - 3) * 30) * Math.PI / 180;
    return 100 + Math.sin(angle) * radio;
  }
  getMarcaX(i: number) {
    return 100 - 2;
  }
  getMarcaY(i: number) {
    return 17;
  }
  getMarcaTransform(i: number) {
    return `rotate(${i * 6} 100 100)`;
  }

  horaMinSec(): [number, number, number] {
    if (!this.reloj?.horaActual) return [0, 0, 0];
    const [h, m, s] = this.reloj.horaActual.split(':').map(Number);
    return [h, m, s];
  }
  getHoraTransform() {
    const [h, m, s] = this.horaMinSec();
    const deg = ((h % 12) + m / 60 + s / 3600) * 30;
    return `rotate(${deg} 100 100)`;
  }
  getMinutoTransform() {
    const [h, m, s] = this.horaMinSec();
    const deg = (m + s / 60) * 6;
    return `rotate(${deg} 100 100)`;
  }
  getSegundoTransform() {
    const [h, m, s] = this.horaMinSec();
    const deg = s * 6;
    return `rotate(${deg} 100 100)`;
  }

  // Botones de edición de segundos
  aumentarSegundo() {
    this.modificarSegundos(1);
  }
  bajarSegundo() {
    this.modificarSegundos(-1);
  }
  private modificarSegundos(delta: number) {
    let [h, m, s] = this.horaMinSec();
    let total = h * 3600 + m * 60 + s + delta;
    if (total < 0) total = 0;
    h = Math.floor(total / 3600);
    m = Math.floor((total % 3600) / 60);
    s = total % 60;
    this.reloj.horaActual = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}
