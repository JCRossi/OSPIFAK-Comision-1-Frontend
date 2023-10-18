'use client';
import React, { createContext, useState } from 'react';


export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [username, setUsername] = useState('');

  const actualizarNombre = (usuario) => {
    try {
      setUsername(usuario);
    } catch (err) {
      console.log(err + " error");
    }
  };

  const contextValue = {
    username,
    actualizarNombre,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
