"use client"

import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGame } from "../context/GameContext"
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"

// Tab screens
import ProfileTab from "../tabs/ProfileTab"
import EducationWorkTab from "../tabs/EducationWorkTab"
import RelationshipsTab from "../tabs/RelationshipsTab"
import ActivitiesTab from "../tabs/ActivitiesTab"
import HealthTab from "../tabs/HealthTab"
import MoneyTab from "../tabs/MoneyTab"
import EventModal from "../components/EventModal"

const Tab = createBottomTabNavigator()

const MainGameScreen = () => {
  const { character, currentEvent, ageUp } = useGame()
  const [showAgeUpModal, setShowAgeUpModal] = useState(false)

  if (!character) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur: Personnage non créé</Text>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      {/* Age Up Button */}
      <TouchableOpacity style={styles.ageUpButton} onPress={() => setShowAgeUpModal(true)}>
        <Text style={styles.ageUpButtonText}>Vieillir d'un an 🎂</Text>
      </TouchableOpacity>

      {/* Event Modal */}
      {currentEvent && <EventModal event={currentEvent} />}

      {/* Age Up Confirmation Modal */}
      <Modal visible={showAgeUpModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vieillir d'un an</Text>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir vieillir d'un an ? Cela fera avancer le temps et pourrait déclencher de nouveaux
              événements dans votre vie.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowAgeUpModal(false)}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => {
                  ageUp()
                  setShowAgeUpModal(false)
                }}
              >
                <Text style={styles.modalButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Main Tab Navigation */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Profile") {
              return <Ionicons name="person" size={size} color={color} />
            } else if (route.name === "Education") {
              return <Ionicons name="school" size={size} color={color} />
            } else if (route.name === "Relations") {
              return <Ionicons name="heart" size={size} color={color} />
            } else if (route.name === "Activities") {
              return <FontAwesome5 name="running" size={size} color={color} />
            } else if (route.name === "Health") {
              return <FontAwesome5 name="heartbeat" size={size} color={color} />
            } else if (route.name === "Money") {
              return <MaterialCommunityIcons name="cash" size={size} color={color} />
            }
          },
          tabBarActiveTintColor: "#FF6B6B",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 3,
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Moi" }} />
        <Tab.Screen name="Education" component={EducationWorkTab} options={{ title: "École/Travail" }} />
        <Tab.Screen name="Relations" component={RelationshipsTab} options={{ title: "Relations" }} />
        <Tab.Screen name="Activities" component={ActivitiesTab} options={{ title: "Activités" }} />
        <Tab.Screen name="Health" component={HealthTab} options={{ title: "Santé" }} />
        <Tab.Screen name="Money" component={MoneyTab} options={{ title: "Argent" }} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  ageUpButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ageUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: "#ddd",
  },
  modalButtonConfirm: {
    backgroundColor: "#FF6B6B",
  },
  modalButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
})

export default MainGameScreen
