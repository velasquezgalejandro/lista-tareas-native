import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

const CustomCard = ({
  titulo,
  descripcion,
  fecha,
  horaInicio,
  horaFinal,
  prioridad,
  completada,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <View
      style={tw`flex items-center justify-center ${
        completada ? "bg-gray-200" : "bg-white"
      }  p-4 rounded-2xl shadow-lg w-80 border border-gray-300 mb-3`}
    >
      <View></View>
      <Text style={tw`text-xl font-bold text-gray-900`}> {titulo} </Text>
      <Text style={tw`text-gray-600 mt-1`}> {descripcion} </Text>

      <View style={tw`mt-2`}>
        <Text style={tw`text-sm text-gray-500`}>Fecha: {fecha}</Text>
        <Text style={tw`text-sm text-gray-500`}>
          Hora: {horaInicio} - {horaFinal}
        </Text>
      </View>

      <View style={tw`mt-2 flex flex-row justify-between items-center `}>
        <Text
          style={tw`text-sm px-2 py-1 rounded-lg ${
            prioridad === "alta"
              ? "bg-red-500 text-white"
              : prioridad === "media"
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          } mx-2`}
        >
          {prioridad}
        </Text>
        <Text
          style={tw`text-sm ${completada ? "text-green-600" : "text-red-600"}`}
        >
          {completada ? "Completada" : "Pendiente"}
        </Text>
      </View>

      <View style={tw`flex flex-row my-3 justify-around w-full`}>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomCard;
