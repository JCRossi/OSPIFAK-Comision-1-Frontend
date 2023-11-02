"use client";

import { API } from '../config';

export async function getReintegrosByClient(clienteUsuario) {
  const response = await fetch(API + "/reintegros/" + clienteUsuario);
  return response.json();
}

export async function postReintegro(formData) {
    try {
      const response = await fetch(API + "/reintegros/", {
        method: "POST",
        body: formData,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }); 
  
      if (response.ok) {
        const reintegroResponse = await response.json();
        return reintegroResponse;
      } else {
        const errorResponse = await response.json();
        console.error('Error al solicitar reintegro:', errorResponse);
        throw new Error("Codigo de status error al crear reintegro: " + response.status);
        
      }
    } catch (error) {
      throw new Error("Mensaje de error: " + error.message);
    }
}