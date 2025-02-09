import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const CustomCard = ({
  titulo,
  descripcion,
  fecha,
  horaInicio,
  horaFinal,
  prioridad,
  completada,
}) => {
  return (
    <View>
      <Text> {titulo} </Text>
      <Text> {descripcion} </Text>
      <Text> {fecha} </Text>
      <Text> {horaInicio} </Text>
      <Text> {horaFinal} </Text>
      <Text> {prioridad} </Text>
      <Text> {completada} </Text>
    </View>
  );
};

export default CustomCard;
