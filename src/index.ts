import express from "express";

const todos = [
  {
    todoId: 1,
    text: "fetch loaded data from vue frontend app ",
    done: true,
  },
  {
    todoId: 2,
    text: "display those todos inside my app",
    done: true,
  },
  {
    todoId: 3,
    text: "develop methods to update my json db of todos",
    done: false,
  },
  {
    todoId: 4,
    text: "watch mutation of mesTodos to automatically update todos",
    done: false,
  },
];

// on créé une instance d'une application Express
const app = express();

// on précise à l'application qu'elle doit parser le body des requêtes en JSON (utilisation d'un middleware)
app.use(express.json());

// on peut utiliser app.get, app.post, app.put, app.delete, etc.. ()

// on définit une route GET /todos, et la fonction qui s'exécute lorsque le serveur reçoit une requête qui matche
app.get("/todos", (request: express.Request, result: express.Response) => {
  console.log(`route "/todos" called`);
  return result.status(200).json(todos);
});

// une autre route pour récupérer 1 TODO
app.get("/todos/:id", (request: express.Request, result: express.Response) => {
  console.log(`route "/todos/:id" called`);
  console.log(`params of the request : ${JSON.stringify(request.params)}`);
  return result
    .status(200)
    .json(
      todos.find((todo) => todo.todoId === Number(request.params.id)) || null,
    );
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((todo) => todo.todoId === id);
  if (index === -1) {
    return res.status(404).json(null);
  } else {
    todos[index] = { ...todos[index], ...req.body };
    return res.status(200).json(todos[index]);
  }
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push({ ...newTodo, todoId: todos.length + 1 });
  return res.status(200).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((todo) => todo.todoId === id);
  if (index === -1) {
    return res.status(404).json(null);
  } else {
    todos.splice(index, 1);
    return res.status(200).json({ ok: true });
  }
});

app.listen(8080, () => console.log("server started, listening on port 8080"));
