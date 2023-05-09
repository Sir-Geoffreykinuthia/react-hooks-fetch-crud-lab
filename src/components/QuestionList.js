import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  //useState
  const[questions , setQuestions]=useState([])

  //Fetch data using GET method
  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then((r)=> r.json())
    .then((questions)=>setQuestions(questions))
  },[])

  //Fetch using DELETE Method
  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",})
      .then((r)=> r.json())
      .then(() => {
        const updatedQuestions = questions.filter((question)=> question.id !== id);
        setQuestions(updatedQuestions);
      });
    }

   //Fetch using PATCH method
   function handleUpdate(id ,correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(correctIndex)
    })
    .then((r)=> r.json())
    .then((questions)=> {
      const updatedQuestions = questions.map((question)=>{
        if(question.id === updatedQuestions.id) return updatedQuestions
        return question
      });
      setQuestions(updatedQuestions)
    });
   }

  const questionsToDisplay=questions.map((question)=> (
  <QuestionItem 
  question={question}
  key={question.id}
  onDelete ={handleDelete}
  onChange={handleUpdate}
  /> 
   ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
       {questionsToDisplay}
        
        </ul>
    </section>
  );
}

export default QuestionList;