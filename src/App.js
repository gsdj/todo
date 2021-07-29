import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import ToDoTable from './Components/TodoTable/TodoTable';
import TodoForm from './Components/TodoForm/TodoForm';

function App() {
  return (
    <div className="App">
      <Header className="App-header"/>
        <div className="App-content">
          <Switch>
            <Route path='/TodoList' component={ToDoTable}  />
            <Route path='/CreateTodo' component={TodoForm} />
            <Route path='/CreateTodo/:id' component={TodoForm} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
