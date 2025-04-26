import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { useGame } from "../context/GameContext"
import { StatusBar } from "expo-status-bar"

const StartScreen = () => {
  const navigation = useNavigation()
  const { startGame } = useGame()

  const handleNewLife = () => {
    startGame()
    navigation.navigate("CharacterCreation" as never)
  }

  // Continue would load saved game in a real implementation
  const handleContinue = () => {
    // This would load a saved game in a real implementation
    alert("Cette fonctionnalité sera disponible dans une future mise à jour!")
  }

  const handleOptions = () => {
    alert("Options seront disponibles dans une future mise à jour!")
  }

  return (
    <ImageBackground source={{ uri: "https://i.imgur.com/JfVcWnA.jpg" }} style={styles.background}>
      <StatusBar style="light" />
      <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]} style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: "https://i.imgur.com/8ZU3ewF.png" }} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Adolescence & Au-delà</Text>
            <Text style={styles.subtitle}>Vivez votre vie virtuelle</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNewLife}>
              <Text style={styles.buttonText}>Nouvelle Vie 🌱</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continuer 📝</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonTertiary]} onPress={handleOptions}>
              <Text style={styles.buttonText}>Options ⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: "#4ECDC4",
  },
  buttonTertiary: {
    backgroundColor: "#FFD166",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default StartScreen
