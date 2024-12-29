import React, {useState, useContext} from "react";
import { UserContext } from './UserContext';

export default function UserForm(){
    const [inputName, setInputName] = useState("");
    // ! i set it as a array and its nottttt
    // const [setName] = useContext(UserContext);
    const {name, setName} = useContext(UserContext);

    function handleChange(event){
        setInputName(event.target.value);

    }

    function handleSubmit(event){
        event.preventDefault();

        // setting the name in context
        setName(inputName); 
        // changing the URL without reloading the page
        window.history.pushState({}, '', '/quiz');
        const navEvent = new PopStateEvent('popstate');
        // dispatch a navigation event
        window.dispatchEvent(navEvent);
    }
    // ! attempt to do conditional rendering with the name

    return (
        // add the form here
        <>
        {name && <h2>Reload the page to restart.</h2>}
        {!name && 
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        }
        </>
    )

}