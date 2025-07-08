import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelojConfig } from '../model';

@Component({
  selector: 'app-reloj-config-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reloj-config-dialog.html',
  styleUrls: ['./reloj-config-dialog.css']
})
export class RelojConfigDialogComponent implements OnInit {
  @Input() config: Partial<RelojConfig> | null = null;
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

  ngOnInit() {
    if (this.config) {
      this.formConfig = {
        ...this.formConfig,
        ...this.config
      };
    }
  }

  submit() {
    // Normaliza horaInicio: si es solo "HH:mm", agrega ":00"
    let hora = this.formConfig.horaInicio;
    if (/^\d{2}:\d{2}$/.test(hora)) {
      hora = hora + ':00';
    }
    this.formConfig.horaInicio = hora;

    this.configurado.emit({ ...this.formConfig });
  }
  cerrar() {
    this.cancelar.emit();
  }
}
