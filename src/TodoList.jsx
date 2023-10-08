import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Todolist() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [value, setValue] = useState(1);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select row first");
    }
  };

  const columns = [
    {
      field: "description",
      sortable: true,
      filter: true,
      floatingFilter: true,
      animateRows: true,
    },
    {
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      animateRows: true,
    },
    {
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
      floatingFilter: true,
      animateRows: true,
    },
  ];

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab value={ 1 } label="Home" />
        <Tab value={ 2 } label="Todolist" />
      </Tabs>
      {value === 1 && <div>Welcome</div>}
      {value === 2  && (
        <div className="header">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <h1>TodoList</h1>

            <TextField
              label="Date"
              variant="standard"
              name="date"
              value={todo.date}
              onChange={inputChanged}
            />
            <TextField
              label="Description"
              variant="standard"
              name="description"
              value={todo.description}
              onChange={inputChanged}
            />

            <Button onClick={addTodo} variant="contained">
              Add
            </Button>

            <button onClick={deleteTodo}>Delete</button>
          </Stack>

          <div
            className="ag-theme-material"
            style={{ height: "700px", width: "70%", margin: "auto" }}
          >
            <AgGridReact
              ref={gridRef}
              onGridReady={(params) => (gridRef.current = params.api)}
              rowSelection="single"
              columnDefs={columns}
              rowData={todos}
            ></AgGridReact>
          </div>
        </div>
      )}
    </>
  );
}

export default Todolist;
