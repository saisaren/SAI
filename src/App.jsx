import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const tasksRef = collection(db, "tasks");

  const loadTasks = async () => {
    const data = await getDocs(tasksRef);
    setTasks(
      data.docs.map((docItem) => ({
        ...docItem.data(),
        id: docItem.id
      }))
    );
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (task.trim() !== "") {
      await addDoc(tasksRef, { name: task });
      setTask("");
      loadTasks();
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    loadTasks();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "white",
      padding: "30px",
      fontFamily: "Arial"
    }}>
      <h1>SAI OS</h1>
      <p>Cloud Synced Tasks</p>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task..."
        style={{ padding: "10px", width: "70%" }}
      />

      <button onClick={addTask}>Add</button>

      {tasks.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#222",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "10px"
          }}
        >
          {item.name}

          <button
            onClick={() => deleteTask(item.id)}
            style={{ float: "right" }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;