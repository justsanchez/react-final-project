// Header.js - Nav Bar
import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from './UserContext';


// ! I just need to style this
// when the users clicks the home link, the artwork does'nt get reset

// TODO: fix when the image is loaded the links get pushed into the very right
export default function Header(){
    const {name, setName} = useContext(UserContext);
    return(
        <>

        <h2>Which Element Are You?</h2>
        <p>(based on completely random things)</p>
        <div className="navTags">
            <Link to="/">Home</Link>  
            <Link to="/quiz">Quiz</Link> 
        </div>
        </>
    )
}