import { Table as BootstrapTable, Button } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";

const DataTable = ({
  data,
  columns,
  loading,
  onEdit,
  onDelete,
  showActions = true,
  emptyMessage = "No data available",
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="table-responsive">
      <BootstrapTable striped bordered hover className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="text-center text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default DataTable;
