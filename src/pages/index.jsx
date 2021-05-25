
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

export function Index() {
    const { user, setUser } = useContext(UserContext);
    return (<div>
        <h2>Home</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        {
            user ? (<button onClick={async () => {
               // call logout from server
                setUser(null)
            }}>logout</button>)
                : (<button onClick={async () => {
                    const user = await login();
                    setUser(user)
                }}>login</button>)
        }
    </div>);
}

export const login = async () => {
    return {
        id: 4,
        username: "bob",
        email: "bob@bob.com"
    };
};