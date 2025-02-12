import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import tw from "twrnc";

//asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "../utils/CustomCard";

const PantallaLista = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [datosOrdenados, setDatosOrdenados] = useState(data);

  //obtener Datos
  const obtenerDatos = async () => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem("tareas");
      return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    } catch (error) {
      console.log("error en la obtencion de datos:", error);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerDatos();
      setData(datos);
    };

    cargarDatos();
  }, []);

  // eliminar tareas
  const eliminarTarea = async (titulo) => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem("tareas");
      let tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];

      // la tarea que se quiere eliminar
      const nuevasTareas = tareas.filter((tarea) => tarea.titulo !== titulo);

      // Guardar la nueva lista
      await AsyncStorage.setItem("tareas", JSON.stringify(nuevasTareas));

      setData(nuevasTareas);
    } catch (error) {
      console.log("Error al eliminar la tarea:", error);
    }
  };

  // editar tareas
  const editarTarea = (tarea) => {
    navigation.navigate("Editar", { tarea });
  };

  // funcion de ordenamiento
  const ordenarDatos = (tareas) => {
    return [...tareas].sort((a, b) => {
      // ordenar por completada
      if (a.completada !== b.completada) {
        return a.completada ? 1 : -1;
      }

      // ordenar por prioridad

      const prioridadValor = (prioridad) => {
        if (prioridad === "alta") return 1;
        if (prioridad === "media") return 2;
        if (prioridad === "baja") return 3;
      };

      if (prioridadValor(a.prioridad) !== prioridadValor(b.prioridad)) {
        return prioridadValor(a.prioridad) - prioridadValor(b.prioridad);
      }

      // por fecha y return final
      return new Date(a.fecha + "T00:00:00") - new Date(b.fecha + "T00:00:00");
    });
  };

  useEffect(() => {
    setDatosOrdenados(ordenarDatos(data));
  }, [data]);

  // return
  return (
    <View style={tw`bg-green-100 h-full`}>
      <View style={tw`flex items-center justify-center`}>
        <Text style={tw`font-bold text-green-900 text-2xl my-2`}>
          Aquí encontraras tus actividades
        </Text>
      </View>
      <FlatList
        data={datosOrdenados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CustomCard
            id={item.id}
            titulo={item.titulo}
            descripcion={item.descripcion}
            fecha={item.fecha}
            horaInicio={item.horaInicio}
            horaFinal={item.horaFinal}
            prioridad={item.prioridad}
            completada={item.completada}
            onEdit={editarTarea}
            onDelete={eliminarTarea}
          />
        )}
        contentContainerStyle={tw`items-center`}
      />
    </View>
  );
};

export default PantallaLista;
