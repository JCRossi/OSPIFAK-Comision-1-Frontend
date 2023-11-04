"use client";

import { API } from '../config';

export async function solicitarBaja(formData) {
  const response = await fetch(API + "/clientes/" + "delete", {
    method: "POST",
    body: formData,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.json();
}