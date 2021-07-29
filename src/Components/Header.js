import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Header(props) {
    
    return (
        <header className={props.className}>
            <nav>
                <div>
                    <ul>
                        <li><NavLink activeClassName="active" className="App-link" to="/TodoList">Весь список</NavLink></li>
                        <li><NavLink activeClassName="active" className="App-link" to="/CreateTodo">Создать запись</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;