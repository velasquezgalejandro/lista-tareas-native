import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import tw from "twrnc";

//asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "../utils/CustomCard";

const PantallaLista = ({ navigation }) => {
  const [data, setData] = useState([]);

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

  // return
  return (
    <View style={tw`bg-green-100 h-full`}>
      <View style={tw`flex items-center justify-center`}>
        <Text>Esta es la vista de Lista</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CustomCard
            titulo={item.titulo}
            descripcion={item.descripcion}
            fecha={item.fecha}
            horaInicio={item.horaInicio}
            horaFinal={item.horaFinal}
            prioridad={item.prioridad}
            completada={item.completada ? "Si" : "No"}
          />
        )}
      />
    </View>
  );
};

export default PantallaLista;
