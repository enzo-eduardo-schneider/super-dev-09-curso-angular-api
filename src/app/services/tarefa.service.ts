import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly http = inject(TarefaService);

  listar(): Obsarvable<tarefaModel.TarefaModel[]> {
  }

  cadastrar(tarefa: TarefaModel): Observable<tarefaModel> {
    const url = "https://api.franciscosensaulas.com/api/v1/trabalho/tarefas"

    return this.http.get<Tarefamodel[]>(url, tarefa);
  }
}
