import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reloj, RelojConfig } from './model';

@Injectable({ providedIn: 'root' })
export class RelojVmService {
  private relojesSubject = new BehaviorSubject<Reloj[]>([]);
  relojes$ = this.relojesSubject.asObservable();

  constructor() {
    setInterval(() => this.avanzarTiempos(), 1000);
  }

  addReloj(config: Omit<Reloj, 'id' | 'horaActual'>) {
    const id = crypto.randomUUID();
    const horaActual = config.horaInicio;
    const nuevo: Reloj = { ...config, id, horaActual };
    this.relojesSubject.next([...this.relojesSubject.value, nuevo]);
  }

  private avanzarTiempos() {
    const actualizados = this.relojesSubject.value.map(r => ({
      ...r,
      horaActual: this.siguienteSegundo(r.horaActual)
    }));
    this.relojesSubject.next(actualizados);
  }

  private siguienteSegundo(hora: string) {
    // hora en formato "HH:mm:ss"
    const [h, m, s] = hora.split(':').map(Number);
    let date = new Date();
    date.setHours(h, m, s + 1, 0);
    // Ajusta overflow
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  editarReloj(id: string, cambios: Partial<RelojConfig>) {
  const lista = this.relojesSubject.value.map(r => {
    if (r.id === id) {
      // Si cambió la hora de inicio, también actualiza la actual
      const nuevaHora = cambios.horaInicio ?? r.horaInicio;
      return {
        ...r,
        ...cambios,
        horaActual: nuevaHora
      };
    }
    return r;
  });
  this.relojesSubject.next(lista);
}


}
