import React, { useState } from "react";
import { View, Text, TextInput, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";

// asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// componentes creados
import CustomButton from "../utils/CustomButton";

const PantallaEditar = ({ navigation }) => {
  // estados
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFinal, setHoraFinal] = useState("");
  const [completada, setCompletada] = useState(false);
  const [prioridad, setPrioridad] = useState("media");
  // estados de error
  const [fechaError, setFechaError] = useState(
    "Ingrese una fecha en el formato YYYY-MM-DD"
  );
  const [horaInicioError, setHoraInicioError] = useState(
    "Ingrese una hora valida HH:MM (24 horas)"
  );
  const [horaFinalError, setHoraFinalError] = useState(
    "Ingrese una hora valida HH:MM (24 horas)"
  );

  // funciones de cambio de estado y revision de datos

  const validarFecha = (fecha) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fecha)) {
      setFechaError("Formato invalido");
    } else {
      setFechaError("Ingrese una fecha en el formato YYYY-MM-DD");
    }
  };

  const validarHora = (hora, setError) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!regex.test(hora)) {
      setError("Formato invalido");
    } else {
      setError("Ingrese una hora valida HH:MM (24 horas)");
    }
  };

  const handleChangeDate = (text) => {
    const filteredText = text.replace(/([^0-9-])/g, "");
    setFecha(filteredText);
    validarFecha(filteredText);
  };

  const handleChangeHour = (hora, setValue, setError) => {
    const filteredText = hora.replace(/[^0-9:]/g, "");
    setValue(filteredText);
    validarHora(filteredText, setError);
  };

  // funcion de guardado de datos y validacion

  const guardarDatos = async () => {
    // validaciones

    if (!titulo || !fecha || !descripcion || !horaInicio || !horaFinal) {
      alert("Por favor diligencie todos los campos");
      return;
    }

    if (horaInicio > horaFinal) {
      alert("La hora de inicio no puede ser mayor a la hora de finalización");
      return;
    }

    if (
      fechaError.includes("invalido") ||
      horaInicioError.includes("invalido") ||
      horaFinalError.includes("invalido")
    ) {
      alert("Corriga el formato de fecha, hora inicio u hora final");
      return;
    }

    //crea objeto a mandar
    const tarea = {
      id: Date.now(),
      titulo,
      descripcion,
      fecha,
      horaInicio,
      horaFinal,
      prioridad,
      completada,
    };

    try {
      // obtiene si ya existe o crea json
      const tareaGuardadas = await AsyncStorage.getItem("tareas");
      const tareas = tareaGuardadas ? JSON.parse(tareaGuardadas) : [];

      // agrega la tarea y guarda la lista
      tareas.push(tarea);
      await AsyncStorage.setItem("tareas", JSON.stringify(tareas));
      navigation.navigate("Lista");
    } catch (error) {
      console.log("Error al guardar la tarea:", error);
    }
  };

  // componentes reutilizables

  const renderTextInput = (placeholder, value, setValue) => {
    return (
      <TextInput
        style={tw`border border-green-700 rounded-lg p-3 mb-4 text-black`}
        placeholder={placeholder}
        placeholderTextColor="black"
        value={value}
        onChangeText={setValue}
      />
    );
  };

  const renderDateInput = (placeholder, value, setValue) => {
    return (
      <TextInput
        style={tw`border border-green-700 rounded-lg p-3 text-black`}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="black"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        maxLength={10}
      />
    );
  };

  const renderHourInput = (placeholder, value, setValue, setError) => {
    return (
      <TextInput
        style={tw`border border-green-700 rounded-lg p-3 text-black`}
        placeholder={placeholder}
        placeholderTextColor="black"
        value={value}
        onChangeText={(value) => handleChangeHour(value, setValue, setError)}
        maxLength={5}
      />
    );
  };

  const renderPrioridadPicker = () => {
    const renderPickerItems = (label, value) => {
      return <Picker.Item label={label} value={value} />;
    };

    return (
      <View style={tw`border border-green-700 rounded-lg bg-white`}>
        <Picker
          value={prioridad}
          onValueChange={(itemValue) => {
            setPrioridad(itemValue);
          }}
        >
          {renderPickerItems("Alta", "alta")}
          {renderPickerItems("Media", "media")}
          {renderPickerItems("Baja", "baja")}
        </Picker>
      </View>
    );
  };

  const renderCompletada = (label, value, setValue) => {
    return (
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-black mr-2`}> {label} </Text>
        <Text style={tw`text-black`}> NO </Text>
        <Switch
          value={value}
          onValueChange={setCompletada}
          thumbColor={value ? "green" : "gray"}
        />
        <Text style={tw`text-black`}> SI </Text>
      </View>
    );
  };

  // return
  return (
    <View style={tw`flex items-center justify-center bg-green-100 h-full`}>
      <View
        style={tw`px-2 py-2 bg-white rounded-lg border border-green-900 min-w-[300px]`}
      >
        <Text style={tw`text-center font-bold py-2`}>Creación de Tarea</Text>

        {renderTextInput("Titulo", titulo, setTitulo)}
        {renderTextInput("Descripción", descripcion, setDescripcion)}
        <View style={tw`mb-2`}>
          {renderDateInput("Fecha (Ej: 2025-02-08)", fecha, handleChangeDate)}
          {fechaError && <Text> {fechaError} </Text>}
        </View>
        <View style={tw`text-center font-bold py-2`}>
          {renderHourInput(
            "Hora de Inicio (EJ: 12:00)",
            horaInicio,
            setHoraInicio,
            setHoraInicioError
          )}
          {horaInicioError && <Text> {horaInicioError} </Text>}
        </View>
        <View style={tw`text-center font-bold py-2`}>
          {renderHourInput(
            "Hora de finalizacion (Ej: 22:00)",
            horaFinal,
            setHoraFinal,
            setHoraFinalError
          )}
          {horaFinalError && <Text> {horaFinalError} </Text>}
        </View>
        {renderPrioridadPicker()}
        {renderCompletada("Tarea completada?", completada, setCompletada)}
        <CustomButton title={"Guardar tarea"} onPress={guardarDatos} />
      </View>
    </View>
  );
};

export default PantallaEditar;
