"use client";

import { API } from '../config';

export async function solicitarBaja(clienteUsuario) {
  const response = await fetch(API + "/clientes/" + clienteUsuario + "/delete");
  return response.json();
}