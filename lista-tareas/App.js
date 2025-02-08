import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PantallaPrincipal from "./screens/PantallaPrincipal";
import PantallaCarga from "./screens/PantallaCarga";
import PantallaLista from "./screens/PantallaLista";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Principal" component={PantallaPrincipal} />
        <Stack.Screen name="Carga" component={PantallaCarga} />
        <Stack.Screen name="Lista" component={PantallaLista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
