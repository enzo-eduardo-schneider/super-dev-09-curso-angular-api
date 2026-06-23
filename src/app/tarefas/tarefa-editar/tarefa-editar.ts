import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TarefaModel } from '../../models/tarefa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-editar',
  imports: [FormsModule],
  templateUrl: './tarefa-editar.html',
  styleUrl: './tarefa-editar.scss',
})
export class TarefaEditar {
  tarefa = signal<TarefaModel>({
    id: "",
    descricao: "",
    prioridade: null,
    horasEstimadas: null
  });

  tarefaService = inject(TarefaService)

  // Método executado quando o componente de editar tarefa é aberto
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    // Pega o id definido na rota /tarefas/editar/:id
    const idParaEditar = activeRoute.snapshot.paramMap.get("id");

    if (idParaEditar === null) {
      alert("Não encontrado o id da tarefa na rota")
      this.router.navigate(["/tarefas"])
      return
    }

    this.tarefa.update(tarefa => ({
      ...tarefa,
      id: idParaEditar
    }));
    this.consultarTarefa();
  }

  consultarTarefa() {
    this.tarefaService.obterPorId(this.tarefa().id).subscribe({
      next: tarefa => {
        this.tarefa.update(() => ({
          id: tarefa.id,
          descricao: tarefa.descricao,
          horasEstimadas: tarefa.horasEstimadas,
          prioridade: tarefa.prioridade
        }));
      },
      error: erro => {
        console.error("Não foi possivel consultar a tarefa", erro)
        alert("Não foi possivel consultar a tarefa")
      }
    })
  }



  salvar(): void {

    this.tarefaService.editar(this.tarefa().id, this.tarefa()).subscribe({
      next: () => {
        alert("tarefa aleterada com sucesso");
        this.router.navigate(["/tarefas"]);
      },
      error: erro => {
        console.error("Nao foi possivel alterar a tarefa" + erro);
        alert ("deU ERRO");
      }
    });

    alert("Tarefa alterada com sucesso");

    this.router.navigate(["/tarefas"]);
  }
}
