import { FormEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Data } from "./Repositories";

export default function Repository() {
  const params = useParams();
  const currentRepository = params["*"] as string;
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");

  async function changeRepositoryDescription(event: FormEvent) {
    event.preventDefault();
    // Realizar a chamada http para atualizar a descrição ~~
    // await queryClient.invalidateQueries(['repos']) - realiza a invalidação dos dados em cache e assim realizar uma nova requisição

    const previousRepos = queryClient.getQueryData<Data[]>("repos"); // Retorna o valor atual dos dados em cache

    if (previousRepos) {
      // Realiza uma verificação se caso o repositório seja igual ao repositório passado pelo parâmetro, alterar a descrição.
      const newRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: description };
        } else {
          return repo;
        }
      });
      // Realiza a atualização dos dados em cache e assim não precisando invalidar o cache para que ele faça uma nova requisição
      queryClient.setQueryData("repos", newRepos);
      setDescription('');
    }
  }

  return (
    <div>
      <p>{currentRepository}</p>

      <form onSubmit={changeRepositoryDescription}>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input type="submit" value="Salvar" />
      </form>
    </div>
  );
}
