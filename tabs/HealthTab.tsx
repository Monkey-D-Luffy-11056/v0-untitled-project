import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useGame } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"

const HealthTab = () => {
  const { character, updateCharacter } = useGame()

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    )
  }

  const handleDoctor = () => {
    if (character.money >= 50) {
      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          health: Math.min(100, character.stats.health + 20),
        },
        physicalHealth: Math.min(100, character.physicalHealth + 15),
        money: character.money - 50,
      }
      updateCharacter(updatedCharacter)
      alert("Vous avez consulté un médecin! Votre santé s'est améliorée. (-50€)")
    } else {
      alert("Vous n'avez pas assez d'argent pour consulter un médecin!")
    }
  }

  const handleExercise = () => {
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        health: Math.min(100, character.stats.health + 10),
        happiness: Math.min(100, character.stats.happiness + 5),
      },
      physicalHealth: Math.min(100, character.physicalHealth + 8),
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez fait de l'exercice! Votre santé physique s'est améliorée.")
  }

  const handleMeditate = () => {
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.min(100, character.stats.happiness + 8),
      },
      mentalHealth: Math.min(100, character.mentalHealth + 12),
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez médité! Votre santé mentale s'est améliorée.")
  }

  const handleEatHealthy = () => {
    if (character.money >= 20) {
      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          health: Math.min(100, character.stats.health + 8),
        },
        physicalHealth: Math.min(100, character.physicalHealth + 5),
        money: character.money - 20,
      }
      updateCharacter(updatedCharacter)
      alert("Vous avez mangé sainement! Votre santé s'est légèrement améliorée. (-20€)")
    } else {
      alert("Vous n'avez pas assez d'argent pour manger sainement!")
    }
  }

  const getHealthStatus = (value: number) => {
    if (value >= 80) return "Excellent"
    if (value >= 60) return "Bon"
    if (value >= 40) return "Moyen"
    if (value >= 20) return "Mauvais"
    return "Critique"
  }

  const getHealthColor = (value: number) => {
    if (value >= 70) return "#5D9C59"
    if (value >= 40) return "#FFD166"
    return "#FF6B6B"
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Santé</Text>
        </View>

        <View style={styles.healthCard}>
          <Text style={styles.cardTitle}>État de Santé</Text>

          <View style={styles.healthRow}>
            <View style={styles.healthLabelContainer}>
              <Text style={styles.healthEmoji}>❤️</Text>
              <Text style={styles.healthLabel}>Santé Générale</Text>
            </View>
            <View style={styles.healthBarContainer}>
              <View
                style={[
                  styles.healthBar,
                  {
                    width: `${character.stats.health}%`,
                    backgroundColor: getHealthColor(character.stats.health),
                  },
                ]}
              />
            </View>
            <Text style={[styles.healthStatus, { color: getHealthColor(character.stats.health) }]}>
              {getHealthStatus(character.stats.health)}
            </Text>
          </View>

          <View style={styles.healthRow}>
            <View style={styles.healthLabelContainer}>
              <Text style={styles.healthEmoji}>🧠</Text>
              <Text style={styles.healthLabel}>Santé Mentale</Text>
            </View>
            <View style={styles.healthBarContainer}>
              <View
                style={[
                  styles.healthBar,
                  {
                    width: `${character.mentalHealth}%`,
                    backgroundColor: getHealthColor(character.mentalHealth),
                  },
                ]}
              />
            </View>
            <Text style={[styles.healthStatus, { color: getHealthColor(character.mentalHealth) }]}>
              {getHealthStatus(character.mentalHealth)}
            </Text>
          </View>

          <View style={styles.healthRow}>
            <View style={styles.healthLabelContainer}>
              <Text style={styles.healthEmoji}>💪</Text>
              <Text style={styles.healthLabel}>Santé Physique</Text>
            </View>
            <View style={styles.healthBarContainer}>
              <View
                style={[
                  styles.healthBar,
                  {
                    width: `${character.physicalHealth}%`,
                    backgroundColor: getHealthColor(character.physicalHealth),
                  },
                ]}
              />
            </View>
            <Text style={[styles.healthStatus, { color: getHealthColor(character.physicalHealth) }]}>
              {getHealthStatus(character.physicalHealth)}
            </Text>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Actions</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleDoctor}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#FF6B6B" }]}>
              <Ionicons name="medkit" size={24} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Consulter un médecin</Text>
              <Text style={styles.actionDescription}>Améliore considérablement votre santé</Text>
              <Text style={styles.actionCost}>Coût: 50€</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleExercise}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#5D9C59" }]}>
              <FontAwesome5 name="running" size={20} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Faire de l'exercice</Text>
              <Text style={styles.actionDescription}>Améliore votre santé physique</Text>
              <Text style={styles.actionCost}>Coût: Gratuit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleMeditate}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#9D65C9" }]}>
              <Ionicons name="flower" size={24} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Méditer</Text>
              <Text style={styles.actionDescription}>Améliore votre santé mentale</Text>
              <Text style={styles.actionCost}>Coût: Gratuit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleEatHealthy}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#4ECDC4" }]}>
              <Ionicons name="nutrition" size={24} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Manger sainement</Text>
              <Text style={styles.actionDescription}>Améliore légèrement votre santé</Text>
              <Text style={styles.actionCost}>Coût: 20€</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>Conseils</Text>
          <Text style={styles.tipText}>
            Maintenir une bonne santé est essentiel pour profiter pleinement de la vie. N'oubliez pas d'équilibrer votre
            santé physique et mentale pour un bien-être optimal!
          </Text>
        </View>
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
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  healthCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  healthRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  healthLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  healthEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  healthLabel: {
    fontSize: 14,
    color: "#555",
  },
  healthBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 8,
  },
  healthBar: {
    height: "100%",
    borderRadius: 6,
  },
  healthStatus: {
    fontSize: 14,
    fontWeight: "bold",
    width: 70,
    textAlign: "right",
  },
  actionsCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  actionCost: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  tipsCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
})

export default HealthTab
