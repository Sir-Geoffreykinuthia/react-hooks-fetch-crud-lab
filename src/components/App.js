import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] =useState([]);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/\${id}`, { method: "DELETE" }).then(() => {
      setQuestions(questions.filter((question) => question.id !== id));
    });
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/\${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        );
        setQuestions(updatedQuestions);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
      <QuestionForm onAddQustion={handleAddQuestion} /> ): (
      <QuestionList questions={questions}
      onDeleteQuestion={handleDeleteQuestion}
      onUpdateQuestion={handleUpdateQuestion}
      />
    )} 
    </main>
  );
}

export default App;
