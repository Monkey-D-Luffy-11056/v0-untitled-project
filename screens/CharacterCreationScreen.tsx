"use client"

import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useGame, type Trait, type Character } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"

// Available traits for selection
const availableTraits: Trait[] = [
  { name: "Intelligent", emoji: "📚", description: "Apprend plus vite et excelle académiquement" },
  { name: "Athlétique", emoji: "💪", description: "Meilleure santé et performances sportives" },
  { name: "Charismatique", emoji: "🎭", description: "Facilité à se faire des amis et influencer les autres" },
  { name: "Rebelle", emoji: "🤪", description: "Tendance à prendre des risques et défier l'autorité" },
  { name: "Aimable", emoji: "😇", description: "Gentil et attentionné envers les autres" },
  { name: "Créatif", emoji: "🎨", description: "Imagination débordante et talents artistiques" },
  { name: "Anxieux", emoji: "😰", description: "Tendance à s'inquiéter et stress plus facilement" },
  { name: "Ambitieux", emoji: "🚀", description: "Déterminé à réussir et atteindre ses objectifs" },
]

const CharacterCreationScreen = () => {
  const navigation = useNavigation()
  const { createCharacter } = useGame()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | "nonbinary" | null>(null)
  const [birthDate, setBirthDate] = useState(new Date(2005, 0, 1))
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedTraits, setSelectedTraits] = useState<Trait[]>([])

  const handleGenderSelect = (selected: "male" | "female" | "nonbinary") => {
    setGender(selected)
  }

  const handleTraitSelect = (trait: Trait) => {
    if (selectedTraits.some((t) => t.name === trait.name)) {
      setSelectedTraits(selectedTraits.filter((t) => t.name !== trait.name))
    } else if (selectedTraits.length < 3) {
      setSelectedTraits([...selectedTraits, trait])
    } else {
      Alert.alert("Maximum 3 traits", "Vous ne pouvez sélectionner que 3 traits maximum.")
    }
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setBirthDate(selectedDate)
    }
  }

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleCreateCharacter = () => {
    if (!firstName || !lastName || !gender || selectedTraits.length === 0) {
      Alert.alert("Information manquante", "Veuillez remplir tous les champs requis.")
      return
    }

    const age = calculateAge(birthDate)
    if (age < 13 || age > 18) {
      Alert.alert("Âge incorrect", "Votre personnage doit avoir entre 13 et 18 ans pour commencer.")
      return
    }

    // Create initial character
    const newCharacter: Character = {
      firstName,
      lastName,
      gender,
      birthDate,
      age,
      traits: selectedTraits,
      stats: {
        happiness: 50 + Math.floor(Math.random() * 30),
        health: 60 + Math.floor(Math.random() * 30),
        intelligence: 50 + Math.floor(Math.random() * 30),
        popularity: 40 + Math.floor(Math.random() * 30),
        wealth: 10 + Math.floor(Math.random() * 10),
      },
      relationships: [
        {
          id: "1",
          name: "Maman",
          type: "parent",
          level: 70 + Math.floor(Math.random() * 30),
          emoji: "👩",
        },
        {
          id: "2",
          name: "Papa",
          type: "parent",
          level: 70 + Math.floor(Math.random() * 30),
          emoji: "👨",
        },
        {
          id: "3",
          name: "Alex",
          type: "friend",
          level: 60 + Math.floor(Math.random() * 30),
          emoji: "🧑",
        },
      ],
      education: {
        level: age < 15 ? "middle" : "high",
        grades: 60 + Math.floor(Math.random() * 30),
        institution: age < 15 ? "Collège Jean Moulin" : "Lycée Victor Hugo",
      },
      work: {
        employed: false,
        company: "",
        position: "",
        salary: 0,
        satisfaction: 0,
      },
      money: 50 + Math.floor(Math.random() * 100),
      mentalHealth: 70 + Math.floor(Math.random() * 20),
      physicalHealth: 70 + Math.floor(Math.random() * 20),
      criminalRecord: 0,
    }

    createCharacter(newCharacter)
    navigation.navigate("MainGame" as never)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Créer votre personnage</Text>

        {/* Name Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identité</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Entrez votre prénom"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Entrez votre nom"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genre</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderButton, gender === "male" && styles.genderButtonSelected]}
              onPress={() => handleGenderSelect("male")}
            >
              <Text style={styles.genderEmoji}>♂️</Text>
              <Text style={styles.genderText}>Masculin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderButton, gender === "female" && styles.genderButtonSelected]}
              onPress={() => handleGenderSelect("female")}
            >
              <Text style={styles.genderEmoji}>♀️</Text>
              <Text style={styles.genderText}>Féminin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderButton, gender === "nonbinary" && styles.genderButtonSelected]}
              onPress={() => handleGenderSelect("nonbinary")}
            >
              <Text style={styles.genderEmoji}>⚧️</Text>
              <Text style={styles.genderText}>Non-Binaire</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Birth Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date de Naissance</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Ionicons name="calendar-outline" size={24} color="#555" />
            <Text style={styles.dateText}>
              {birthDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </Text>
            <Text style={styles.ageText}>({calculateAge(birthDate)} ans)</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date(2010, 11, 31)}
              minimumDate={new Date(2000, 0, 1)}
            />
          )}
        </View>

        {/* Traits Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traits de Caractère (max 3)</Text>
          <Text style={styles.sectionSubtitle}>Ces traits influenceront votre parcours de vie</Text>

          <View style={styles.traitsContainer}>
            {availableTraits.map((trait) => (
              <TouchableOpacity
                key={trait.name}
                style={[
                  styles.traitButton,
                  selectedTraits.some((t) => t.name === trait.name) && styles.traitButtonSelected,
                ]}
                onPress={() => handleTraitSelect(trait)}
              >
                <Text style={styles.traitEmoji}>{trait.emoji}</Text>
                <Text style={styles.traitName}>{trait.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Traits */}
        {selectedTraits.length > 0 && (
          <View style={styles.selectedTraitsContainer}>
            <Text style={styles.selectedTraitsTitle}>Traits sélectionnés:</Text>
            {selectedTraits.map((trait) => (
              <View key={trait.name} style={styles.selectedTrait}>
                <Text style={styles.selectedTraitText}>
                  {trait.emoji} {trait.name} - {trait.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateCharacter}>
          <Text style={styles.createButtonText}>Commencer votre vie</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 4,
    backgroundColor: "#f5f5f5",
  },
  genderButtonSelected: {
    borderColor: "#4ECDC4",
    backgroundColor: "#e6f7f6",
  },
  genderEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  genderText: {
    fontSize: 14,
    color: "#333",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  ageText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  traitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  traitButton: {
    width: "48%",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
  },
  traitButtonSelected: {
    borderColor: "#FF6B6B",
    backgroundColor: "#ffeded",
  },
  traitEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  traitName: {
    fontSize: 14,
    color: "#333",
  },
  selectedTraitsContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedTraitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  selectedTrait: {
    marginBottom: 6,
  },
  selectedTraitText: {
    fontSize: 14,
    color: "#555",
  },
  createButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default CharacterCreationScreen
