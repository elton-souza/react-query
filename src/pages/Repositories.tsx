import axios from "axios";
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";

export interface Data {
  full_name: string;
  description: string;
}

export default function Repositories() {
  const { data, isFetching } = useQuery<Data[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/elton-souza/repos"
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, //minute
    }
  );
  return (
    <div>
      {isFetching && <p>Carregando...</p>}
      <ul>
        {data?.map((item: Data) => (
          <li>
            <Link to={`/repository/${item.full_name}`}>{item.full_name}</Link>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
