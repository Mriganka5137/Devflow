# Devflow

A Stackoverflow Clone using Next.js

## Context API in Next.js

- The Context API in React provides a way to pass data through the component tree without having to pass props down manually at every level. This is particularly useful for data that should be globally available throughout your application like theme or user data.

- The Provider should use 'use client' at the top in Next.js. So that we can use the client side hooks in the server components.

1. Create a context

```
   import react, {createContext, useState} from 'react';

   export const UserContext = createContext(null);

```

2. Provide the Context Value

```
  export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    return (
      <UserContext.Provider value={{user, setUser}}>
        {children}
      </UserContext.Provider>
    );
  }
```

3. Consume the Context Value

```
  import React, { useContext } from 'react';
  import { MyContext } from './MyContext';

  function MyComponent() {
      const { value } = useContext(MyContext);

      return <div>{value}</div>;
  }

  export default MyComponent;
```
