import React, { useState, useEffect, useRef} from 'react'
import './App.css';



function App() {
  const [todos, setTodos] = useState([
    {
      text: 'text1',
      parent: 'list1'
    },
    {
      text: 'text2',
      parent: 'list2'
    }
  ])

  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const taskTotal = useRef(0)

  useEffect(() => {
    taskTotal.current += taskTotal.current
  }, [input1])

  const inputText1 = (e) => {
    setInput1(e.target.value)
  }

  const addTask = (e, parent, textValue) => {
    setTodos([
      ...todos,
      {
        text: textValue,
        parent: parent,
        completed: false
      }
    ])
  }

  const deleteTodo = (index) => {
    let newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
  }

  const move = (index, moveTo) => {
    let newTodos = [...todos]
    let movedTodo = newTodos[index]
    movedTodo.parent = movedTodo
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <div className='list1'>
        <form className='list1_top'>
          <input value={input1} onChange={inputText1} type='text'></input>
          <button onClick={(e) => {
            addTask(e, 'list1', input1)
          }}>Add</button>
        </form>
        <header>List1</header>
        <div className='list1_bottom '>
          {
            todos.map((todo, index) => {
              if(todo.parent === 'list1'){
                return <div key={index}>
                  <span classname={`text ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
                  <div className='btn-wrapper'>
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                  </div>
                  <div className='radio-btn'>
                    <label>Move To: </label>
                    <input onClick={() => move(index, 'list2')} value='list2' type='radio'></input>
                    <lable>list 2</lable>
                    <input onClick={() => move(index, 'list3')} value='list3' type='radio'></input>
                    <label>list 3</label>
                  </div>
                </div>
              }
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
