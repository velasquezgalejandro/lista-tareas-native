import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={tw`py-3 px-5 rounded-lg bg-black items-center justify-center `}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={tw`text-white text-lg font-bold text-green-400`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
