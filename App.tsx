import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GameProvider } from "./context/GameContext"

import StartScreen from "./screens/StartScreen"
import CharacterCreationScreen from "./screens/CharacterCreationScreen"
import MainGameScreen from "./screens/MainGameScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Start"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "#fff" },
            }}
          >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="CharacterCreation" component={CharacterCreationScreen} />
            <Stack.Screen name="MainGame" component={MainGameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </SafeAreaProvider>
  )
}
