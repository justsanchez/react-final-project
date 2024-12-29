import React, {createContext, useState} from "react";

/*
 we'll display our quiz title and navigation links! 
 Be sure to use the <Link /> component to set up a default “/” path, 
 and a “/quiz” path.
*/


/* 
? {children}: Ensures the child components (passed as children) are rendered within the provider.
*/

// ! I did not have this
export const UserContext = createContext();


// The UserProvider component
// This component acts as a context provider for the UserContext.
// It shares the `name` state and its updater function (`setName`) with its children.
export default function UserProvider({ children }) {
    // State to manage the user's name
    const [name, setName] = useState(""); // Initial value is an empty string
    
    return (
        // Provide the `name` and `setName` values to all child components via UserContext
        <UserContext.Provider value={{ name, setName }}>
            {/* Render child components wrapped by the UserProvider */}
            {children}
        </UserContext.Provider>
    );
}
