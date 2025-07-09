import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelojConfig } from '../model';
import { RelojVmService } from '../vm.service';

@Component({
  selector: 'app-reloj-config-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reloj-config-dialog.html',
  styleUrls: ['./reloj-config-dialog.css']
})
export class RelojConfigDialogComponent implements OnInit, OnDestroy {
  @Input() config: Partial<RelojConfig> | null = null;
  @Input() relojId: string | null = null;
  @Output() configurado = new EventEmitter<RelojConfig>();
  @Output() cancelar = new EventEmitter<void>();

  formConfig: RelojConfig = {
    horaInicio: '12:00:00',
    colorNumeros: '#222222',
    colorPuntos: '#888888',
    colorManecillaHora: '#222222',
    colorManecillaMinuto: '#444444',
    colorManecillaSegundo: '#b91c1c',
    colorEtiqueta: '#333333'
  };

  horaSimulada: string = '12:00:00';
  editando: boolean = false;
  private timerId: any;

  constructor(private relojVmService: RelojVmService) {}

  ngOnInit() {
  if (this.config) {
    this.formConfig = { ...this.formConfig, ...this.config };
  }
  if (this.relojId) {
    const relojes = this.relojVmService.relojesValue;
    const relojActual = relojes.find(r => r.id === this.relojId);
    if (relojActual) {
      this.horaSimulada = relojActual.horaActual;
      this.formConfig.horaInicio = relojActual.horaActual.substring(0,5);
      this.startTimer();
      return;
    }
  }
  let [hh, mm, ss] = this.formConfig.horaInicio.split(':');
  if (!ss) ss = '00';
  this.horaSimulada = `${hh.padStart(2,'0')}:${mm.padStart(2,'0')}:${ss.padStart(2,'0')}`;
  this.startTimer();
}

  startTimer() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.horaSimulada = this.siguienteSegundo(this.horaSimulada);
      // Si NO se está editando, sincroniza el input con horaSimulada (sin segundos)
      if (!this.editando) {
        this.formConfig.horaInicio = this.horaSimulada.substring(0,5);
      }
    }, 1000);
  }

  siguienteSegundo(hora: string) {
    const [h, m, s] = hora.split(':').map(Number);
    let date = new Date();
    date.setHours(h, m, s + 1, 0);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  onHoraInput() {
    // Mantén los segundos actuales al cambiar hora/minuto
    const [hh, mm] = this.formConfig.horaInicio.split(':');
    const ss = this.horaSimulada.split(':')[2] || '00';
    this.horaSimulada = `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`;
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
  }

  submit() {
    // Al guardar, normaliza con segundos actuales
    let [hh, mm] = this.formConfig.horaInicio.split(':');
    const ss = this.horaSimulada.split(':')[2] || '00';
    this.formConfig.horaInicio = `${hh.padStart(2,'0')}:${mm.padStart(2,'0')}:${ss.padStart(2,'0')}`;
    this.configurado.emit({ ...this.formConfig });
  }

  cerrar() {
    this.cancelar.emit();
  }
}
