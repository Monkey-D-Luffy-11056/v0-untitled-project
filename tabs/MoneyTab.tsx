import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useGame } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"

const MoneyTab = () => {
  const { character, updateCharacter } = useGame()

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    )
  }

  const handlePartTimeJob = () => {
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.max(0, character.stats.happiness - 5),
        wealth: Math.min(100, character.stats.wealth + 3),
      },
      money: character.money + 50,
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez travaillé à temps partiel et gagné 50€!")
  }

  const handleAskParents = () => {
    // Success depends on relationship with parents
    const parentRelationship = character.relationships.find((r) => r.type === "parent")
    const successChance = parentRelationship ? parentRelationship.level / 100 : 0.5

    if (Math.random() < successChance) {
      const amount = 20 + Math.floor(Math.random() * 30)
      const updatedCharacter = {
        ...character,
        money: character.money + amount,
      }
      updateCharacter(updatedCharacter)
      alert(`Vos parents vous ont donné ${amount}€!`)
    } else {
      alert("Vos parents ont refusé de vous donner de l'argent cette fois-ci.")
    }
  }

  const handleShopping = () => {
    if (character.money >= 30) {
      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          happiness: Math.min(100, character.stats.happiness + 10),
        },
        money: character.money - 30,
      }
      updateCharacter(updatedCharacter)
      alert("Vous avez fait du shopping et dépensé 30€. Votre bonheur a augmenté!")
    } else {
      alert("Vous n'avez pas assez d'argent pour faire du shopping!")
    }
  }

  const handleInvest = () => {
    if (character.money >= 100) {
      // Simple investment simulation
      const success = Math.random() > 0.4

      if (success) {
        const profit = Math.floor(Math.random() * 50) + 20
        const updatedCharacter = {
          ...character,
          stats: {
            ...character.stats,
            wealth: Math.min(100, character.stats.wealth + 5),
          },
          money: character.money + profit,
        }
        updateCharacter(updatedCharacter)
        alert(`Votre investissement a été fructueux! Vous avez gagné ${profit}€.`)
      } else {
        const loss = Math.floor(Math.random() * 30) + 10
        const updatedCharacter = {
          ...character,
          stats: {
            ...character.stats,
            happiness: Math.max(0, character.stats.happiness - 5),
          },
          money: Math.max(0, character.money - loss),
        }
        updateCharacter(updatedCharacter)
        alert(`Votre investissement n'a pas été fructueux. Vous avez perdu ${loss}€.`)
      }
    } else {
      alert("Vous n'avez pas assez d'argent pour investir!")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Finances</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Solde actuel</Text>
          <Text style={styles.balanceAmount}>{character.money} €</Text>

          <View style={styles.wealthContainer}>
            <Text style={styles.wealthLabel}>Richesse:</Text>
            <View style={styles.wealthBarContainer}>
              <View
                style={[
                  styles.wealthBar,
                  {
                    width: `${character.stats.wealth}%`,
                    backgroundColor:
                      character.stats.wealth > 70 ? "#5D9C59" : character.stats.wealth > 40 ? "#FFD166" : "#FF6B6B",
                  },
                ]}
              />
            </View>
            <Text style={styles.wealthValue}>{character.stats.wealth}%</Text>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Actions</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handlePartTimeJob}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#5D9C59" }]}>
              <FontAwesome5 name="briefcase" size={20} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Travail à temps partiel</Text>
              <Text style={styles.actionDescription}>Gagnez de l'argent rapidement</Text>
              <Text style={styles.actionResult}>+50€</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleAskParents}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#9D65C9" }]}>
              <Ionicons name="people" size={24} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Demander aux parents</Text>
              <Text style={styles.actionDescription}>Tentez votre chance pour obtenir de l'argent</Text>
              <Text style={styles.actionResult}>+?€</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShopping}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#FF6B6B" }]}>
              <Ionicons name="cart" size={24} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Shopping</Text>
              <Text style={styles.actionDescription}>Dépensez de l'argent pour augmenter votre bonheur</Text>
              <Text style={styles.actionResult}>-30€</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleInvest}>
            <View style={[styles.actionIconContainer, { backgroundColor: "#4ECDC4" }]}>
              <MaterialCommunityIcons name="chart-line" size={24} color="#fff" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Investir</Text>
              <Text style={styles.actionDescription}>Risquez votre argent pour potentiellement en gagner plus</Text>
              <Text style={styles.actionResult}>Minimum: 100€</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>Conseils</Text>
          <Text style={styles.tipText}>
            Gérez votre argent avec sagesse! Les investissements peuvent être risqués mais potentiellement lucratifs.
            N'oubliez pas de maintenir un équilibre entre économiser et dépenser pour votre bonheur.
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
  balanceCard: {
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
    alignItems: "center",
  },
  balanceTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#5D9C59",
    marginBottom: 16,
  },
  wealthContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  wealthLabel: {
    fontSize: 14,
    color: "#555",
    width: 70,
  },
  wealthBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
  },
  wealthBar: {
    height: "100%",
    borderRadius: 4,
  },
  wealthValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    width: 40,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
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
  actionResult: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#5D9C59",
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

export default MoneyTab
