import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import functionService from "../services/functionService";
import FunctionList from "../components/functions/FunctionList";

const Functions = () => {
  const [filter, setFilter] = useState("");
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const fetchFunctions = async () => {
      const data = await functionService.getAllFunctions();
      setFunctions(data);
    };

    fetchFunctions();
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredFunctions = functions.filter((f) =>
    f.movie?.directorName?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">All Functions</h1>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Filter by director name..."
          value={filter}
          onChange={handleFilterChange}
        />
      </Form>
      <FunctionList functions={filteredFunctions} />
    </Container>
  );
};

export default Functions;
