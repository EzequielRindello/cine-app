import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import functionService from "../services/functionService";
import FunctionList from "../components/functions/FunctionList";

const Functions = () => {
  const [filter, setFilter] = useState("");
  const [functions, setFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFunctions = async () => {
      setIsLoading(true);
      const data = await functionService.getAllFunctions();
      setFunctions(data);
      setIsLoading(false);
    };

    fetchFunctions();
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredFunctions = functions.filter((f) => {
    const director = f.movie?.directorName?.toLowerCase() || "";
    const title = f.movie?.title?.toLowerCase() || "";
    const query = filter.toLowerCase();

    return director.includes(query) || title.includes(query);
  });

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">All Functions</h1>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by director or movie title"
          value={filter}
          onChange={handleFilterChange}
        />
      </Form>
      <FunctionList functions={filteredFunctions} isLoading={isLoading} />
    </Container>
  );
};

export default Functions;
