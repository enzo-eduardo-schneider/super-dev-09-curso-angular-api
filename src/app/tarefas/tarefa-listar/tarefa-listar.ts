import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarefaModel } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-listar',
  imports: [RouterLink],
  templateUrl: './tarefa-listar.html',
  styleUrl: './tarefa-listar.scss',
})
export class TarefaListar {
  tarefas = signal<TarefaModel[]>([]);
  tarefaService: any;

  ngOnInit() {
    this.carregarTarefas();
  }

  readonly totalMinutos = computed(() => {
    let total = 0;
    this.tarefas().forEach(tarefa => {
      total += tarefa.horasEstimadas ?? 0;
    });
    return total;
  })

  carregarTarefas(): void {
   this.tarefaService.listar().subscribe({
    next: tarefas => {
      const tarefasordenadas = tarefas.sort((x, y) => x.descripion.locatscompare())
      this.tarefas.set(tarefaOrdenadas)
    },
    error: erro => {
      console.error("Erro ao carregar as tarefas.", erro);
      alert(Não foi possivel carregar as tarefas)}
   })
  }

  apagar(id: string): void {
    this.tarefas.update(tarefas => tarefas.filter(x => x.id !== id))
    const tarefasString = JSON.stringify(this.tarefas());
    localStorage.setItem("tarefas", tarefasString);
  }
}
