import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import functionService from "../services/functionService";
import FunctionList from "../components/functions/FunctionList";

const Functions = () => {
  const [filter, setFilter] = useState("");
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const moviesData = await functionService.getMovies();
      const allFunctions = [];

      for (const movie of moviesData) {
        const { functions } = await functionService.getMovieFunctions(movie.id);
        functions.forEach((f) => allFunctions.push({ ...f, movie }));
      }

      setFunctions(allFunctions);
    };

    fetchAll();
  }, []);

  const filtered = functions.filter((f) =>
    f.movie.directorName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">All Functions</h1>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Filter by director name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form>
      <FunctionList functions={filtered} />
    </Container>
  );
};

export default Functions;
