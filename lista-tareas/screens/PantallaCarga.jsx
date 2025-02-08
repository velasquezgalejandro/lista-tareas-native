import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import tw from "twrnc";

// componentes creados
import CusttomButton from "../utils/CustomButton";

const PantallaLista = ({ navigation }) => {
  // estados
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFinal, setHoraFinal] = useState("");
  const [completada, setCompletada] = useState("");
  const [prioridad, setPrioridad] = useState("");
  // componentes reutilizables

  // funciones

  return (
    <View style={tw`flex items-center justify-center bg-green-100 h-full`}>
      <View
        style={tw`px-2 py-2 bg-white rounded-lg border border-green-900 min-w-[300px]`}
      >
        <Text>Creación de Tarea</Text>

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Titulo"
          placeholderTextColor="black"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Descripcion"
          placeholderTextColor="black"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Fecha"
          placeholderTextColor="black"
          value={fecha}
          onChangeText={setFecha}
        />

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Hora de inicio"
          placeholderTextColor="black"
          value={horaInicio}
          onChangeText={setHoraInicio}
        />

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Hora de finalizacion"
          placeholderTextColor="black"
          value={horaFinal}
          onChangeText={setHoraFinal}
        />

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Completada"
          placeholderTextColor="black"
          value={completada}
          onChangeText={setCompletada}
        />

        <TextInput
          style={tw`border border-blue-900 rounded-lg p-3 mb-4 text-black`}
          placeholder="Prioridad"
          placeholderTextColor="black"
          value={prioridad}
          onChangeText={setPrioridad}
        />

        <CusttomButton title={"Guardar tarea"} />
      </View>
    </View>
  );
};

export default PantallaLista;
