'use client';
import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [username, setUsername] = useState('');

  const setUserName = (usuario) => {
    //if(username===null){
      setUsername(usuario);
      console.log(username + ' contsdaqfexto');
    //}
    console.log(usuario + ' contexto'); // Utiliza 'usuario' en lugar de 'username'
    console.log(username + ' csfhuagha'); // Esto puede mostrar el valor anterior
  };

  const contextValue = {
    username,
    setUserName,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
