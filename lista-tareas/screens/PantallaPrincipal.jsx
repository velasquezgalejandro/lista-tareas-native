// importaciones de libreria
import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

// componentes creados
import CustomButton from "../utils/CustomButton";

const PantallaPrincipal = ({ navigation }) => {
  // funciones

  const handlePress = (vista) => navigation.navigate(vista);

  // return
  return (
    <View style={tw`flex items-center justify-center bg-green-100 h-full`}>
      <Text style={tw`font-bold text-black text-2xl text-center w-full`}>
        Estas son tus tareas
      </Text>
      <View style={tw`my-5`}>
        <CustomButton
          title={"Lista de tareas"}
          onPress={() => handlePress("Lista")}
        />
      </View>
      <View>
        <CustomButton
          title={"Crear tareas"}
          onPress={() => handlePress("Carga")}
        />
      </View>
    </View>
  );
};

export default PantallaPrincipal;
