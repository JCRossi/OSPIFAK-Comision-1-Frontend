"use client";

import { API } from '../config';

export async function solicitarBaja(formData) {
  const response = await fetch(API + "/solicitudesBaja", {
    method: "POST",
    body: formData,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.json();
}

export async function getBajas(clienteUsuario) {
  const response = await fetch(API + "/solicitudesBaja/" + clienteUsuario);
  return response.json();
}