import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    width: '80%',
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    color: '#78d278',
  },
  subTitle: {
    fontSize: 20,
    color: '#78d278',
  },
  table: {
    width: '100%',
    marginTop: '1rem',
    border: '1px solid #78d278',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  inputGroupText: {
    backgroundColor: 'white',
  },
  formControl: {
    fontSize: 'x-large',
  },
  image: {
    maxWidth: 200,
  },
});

const CuponPagoPDF = ({ cliente, menores, periodo_pago, plan, precioCliente, precioTotal }) => {

  return (
    <Document>
      <Page>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Cupón de Pago</Text>
            <Text style={styles.subTitle}>Titular:</Text>
            <View style={styles.table}>
              <Text>DNI: {cliente.dni}</Text>
              <Text>
                Apellido y nombre: {cliente.apellido} {cliente.nombre}
              </Text>
              <Text>Precio por mes: ${precioCliente}</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.subTitle}>Menores a cargo:</Text>
            </View>
            {menores && menores.length > 0 ? (
              <View style={styles.table}>
                {menores.map((menor) => (
                  <View key={menor.id}>
                    <Text>{menor.dni}</Text>
                    <Text>
                      {menor.apellido} {menor.nombre}
                    </Text>
                    <Text>Precio por mes: ${plan.precio_jovenes}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No hay menores asociados a este cliente.</Text>
            )}
            <View>
              <View>
                <Text>Plan: {plan.nombre}</Text>
              </View>
              <View>
                <Text>Forma de Pago: {cliente.forma_pago}</Text>
              </View>
              <View>
                <Text>Período de Pago: {periodo_pago}</Text>
              </View>
            </View>
            <View>
              <View style={styles.inputGroup}>
                <Text style={{ ...styles.inputGroupText, fontSize: 24 }}>Precio total: ${precioTotal}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CuponPagoPDF;
