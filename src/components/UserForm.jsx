import React, {useState, useContext} from "react";
import { UserContext } from './UserContext';

export default function UserForm(){
    const [inputName, setInputName] = useState("");
    // ! i set it as a array and its nottttt
    // const [setName] = useContext(UserContext);
    const {name, setName} = useContext(UserContext);
    

    const [error, setError] = useState(false);

    function handleChange(event){
        setInputName(event.target.value);

    }

    function handleSubmit(event){
        event.preventDefault();

        if (inputName == null | inputName == ''){
            setError(true);
            return;
        }

        // setting the name in context
        setName(inputName); 
        // changing the URL without reloading the page
        window.history.pushState({}, '', '/quiz');
        const navEvent = new PopStateEvent('popstate');
        // dispatch a navigation event

        window.dispatchEvent(navEvent);
    }

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
        {error && <p className="errorStyle">Please enter a name to continue...</p>}
        </>
    )

}