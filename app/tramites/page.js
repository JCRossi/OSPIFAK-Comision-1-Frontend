"use client"
import { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Prestaciones from "../prestaciones/page.js";
import Reintegros from "../reintegros/reintegros.js";
import Bajas from '../bajas/page.js';

export default function Tramites() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Prestaciones', value: '1' },
    { name: 'Reintegros', value: '2' },
    { name: 'Bajas', value: '3' },
    { name: 'Generar cupón de pago', value: '4' },
  ];

  let selectedComponent;

  switch (radioValue) {
    case '1':
      selectedComponent = <Prestaciones />;
      break;
    case '2':
      selectedComponent = <Reintegros />;
      break;
    case '3':
      selectedComponent = <Bajas />;
      break;
    default:
      selectedComponent = <div>Todavía sin implementar</div>;
  }

  return (
    <>
      <div style={{ marginTop: '2vh' }}>
        <ButtonGroup size="lg">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radioValue === radio.value ? 'outline-success' : 'outline-secondary'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)
              }
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div>
        {selectedComponent}
      </div>
    </>
  );
}