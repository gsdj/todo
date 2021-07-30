import '../../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function GetId() {
    let query = useQuery();
    let id = query.get("id");
    
    if (id === "" || id === null || id === undefined) {
        id = 0;
    }
    return id;
}

function TodoForm(props) {
    const [nameState, setNameState] = useState("");
    const [descState, setDescState] = useState("");
    const [idState, setIdState] = useState(GetId());

    useEffect(() => {
        if (idState !== 0) {
            axios('http://127.0.0.1:3001/api/TodoList/' + idState).then(res => {
                setIdState(res.data._id);
                setNameState(res.data.name);
                setDescState(res.data.description);
            });
          }
    },[idState]);

    const Submit = function(e) {
        if (idState === 0) {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:3001/api/TodoList/Create',
                data: JSON.stringify ({
                    name: nameState,
                    description: descState
                }),
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json" 
                },
              });
        } else {
            axios({
                method: 'put',
                url: 'http://127.0.0.1:3001/api/TodoList/update',
                data: JSON.stringify ({
                    id: idState,
                    name: nameState,
                    description: descState
                }),
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json" 
                },
              });
        }
        e.preventDefault(); 
    }

    const ResBtn = function() {
        setNameState("");
        setDescState("");
        setIdState(0);
    }

    return(
        <div className="form">
            <form className="App-form" onSubmit={Submit}>
                <input id="id" type="hidden" value={idState}></input>
                <div className="App-formElem">
                    <label htmlFor="name">Наименование:</label>
                    <input id="name" type="text" value={nameState} onChange={e => setNameState(e.target.value)}></input>
                </div>
                <div className="App-formElem">
                    <label htmlFor="desc">Описание:</label>
                    <input id="desc" type="text" value={descState} onChange={e => setDescState(e.target.value)}></input>
                </div>
                <div className="App-formElem">
                    <button className="App-btn" type="button" value="resetBtn" onClick={ResBtn}>Сброс</button>
                    <button className="App-submit" type="submit" value="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;