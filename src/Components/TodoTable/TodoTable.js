import '../../App.css';
import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ToDoTable(props) {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'http://127.0.0.1:3001/api/TodoList',
        );
        setData(result.data);
      };
      fetchData();
    }, []);

    const delTodo = function(e,id) {
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:3001/api/TodoList/' + id,
            headers: { 
                "Accept": "application/json" 
            },
        }).then((res) => {
            setData(res.data);
        });
        e.preventDefault(); 
    };


    const renderList = function() {
        if (data.length !== 0) {
            return(
                data.map(item => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                            <button className="tableBtn" type="button" onClick={(e) => delTodo(e,item._id)}>Удалить</button>
                            <Link className="App-linkTable" to={`/CreateTodo?id=${item._id}`}>Изменить</Link> 
                        </td>
                    </tr>
                ))
            )
        } else {
            return(
                <tr>
                    <td colSpan="3">Нет данных</td>
                </tr>
            )
        }
    }

    return(
        <table className="App-table">
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Описание</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {renderList()}
            </tbody>
      </table>
    )
}

export default ToDoTable;