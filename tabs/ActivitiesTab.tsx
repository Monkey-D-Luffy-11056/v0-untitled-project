import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useGame } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"

const ActivitiesTab = () => {
  const { character, updateCharacter } = useGame()

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    )
  }

  const handleParty = () => {
    // Increase happiness and popularity, decrease health slightly
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.min(100, character.stats.happiness + 15),
        popularity: Math.min(100, character.stats.popularity + 10),
        health: Math.max(0, character.stats.health - 5),
      },
      money: Math.max(0, character.money - 30),
    }
    updateCharacter(updatedCharacter)
    alert(
      "Vous avez fait la fête! Votre bonheur et votre popularité ont augmenté, mais votre santé a légèrement diminué. (-30€)",
    )
  }

  const handleVideoGames = () => {
    // Increase happiness, decrease health slightly
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.min(100, character.stats.happiness + 10),
        health: Math.max(0, character.stats.health - 2),
      },
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez joué aux jeux vidéo! Votre bonheur a augmenté, mais votre santé a légèrement diminué.")
  }

  const handleSports = () => {
    // Increase health and happiness
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        health: Math.min(100, character.stats.health + 15),
        happiness: Math.min(100, character.stats.happiness + 5),
      },
      physicalHealth: Math.min(100, character.physicalHealth + 10),
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez fait du sport! Votre santé et votre bonheur ont augmenté.")
  }

  const handleMusic = () => {
    // Increase happiness and intelligence
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.min(100, character.stats.happiness + 8),
        intelligence: Math.min(100, character.stats.intelligence + 3),
      },
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez écouté de la musique! Votre bonheur et votre intelligence ont légèrement augmenté.")
  }

  const handleFlirt = () => {
    // Chance-based outcome
    const success = Math.random() > 0.4

    if (success) {
      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          happiness: Math.min(100, character.stats.happiness + 12),
          popularity: Math.min(100, character.stats.popularity + 5),
        },
      }
      updateCharacter(updatedCharacter)
      alert("Votre flirt a été bien reçu! Votre bonheur et votre popularité ont augmenté.")
    } else {
      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          happiness: Math.max(0, character.stats.happiness - 8),
        },
      }
      updateCharacter(updatedCharacter)
      alert("Votre tentative de flirt a échoué... Votre bonheur a diminué.")
    }
  }

  const handleTravel = () => {
    if (character.money >= 100) {
      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          happiness: Math.min(100, character.stats.happiness + 20),
          intelligence: Math.min(100, character.stats.intelligence + 5),
        },
        money: character.money - 100,
      }
      updateCharacter(updatedCharacter)
      alert("Vous avez voyagé! Votre bonheur et votre intelligence ont considérablement augmenté. (-100€)")
    } else {
      alert("Vous n'avez pas assez d'argent pour voyager!")
    }
  }

  // Filter activities based on age
  const isAdult = character.age >= 18

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Activités</Text>
        </View>

        <View style={styles.activitiesCard}>
          <Text style={styles.cardTitle}>Loisirs</Text>

          <TouchableOpacity style={styles.activityButton} onPress={handleParty}>
            <View style={[styles.activityIconContainer, { backgroundColor: "#FF6B6B" }]}>
              <Ionicons name="beer" size={24} color="#fff" />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Faire la fête</Text>
              <Text style={styles.activityDescription}>Augmente votre bonheur et votre popularité</Text>
              <Text style={styles.activityCost}>Coût: 30€</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityButton} onPress={handleVideoGames}>
            <View style={[styles.activityIconContainer, { backgroundColor: "#4ECDC4" }]}>
              <Ionicons name="game-controller" size={24} color="#fff" />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Jeux vidéo</Text>
              <Text style={styles.activityDescription}>Augmente votre bonheur</Text>
              <Text style={styles.activityCost}>Coût: Gratuit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityButton} onPress={handleSports}>
            <View style={[styles.activityIconContainer, { backgroundColor: "#5D9C59" }]}>
              <FontAwesome5 name="basketball-ball" size={20} color="#fff" />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Sport</Text>
              <Text style={styles.activityDescription}>Augmente votre santé et votre bonheur</Text>
              <Text style={styles.activityCost}>Coût: Gratuit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityButton} onPress={handleMusic}>
            <View style={[styles.activityIconContainer, { backgroundColor: "#9D65C9" }]}>
              <Ionicons name="musical-notes" size={24} color="#fff" />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Musique</Text>
              <Text style={styles.activityDescription}>Augmente votre bonheur et votre intelligence</Text>
              <Text style={styles.activityCost}>Coût: Gratuit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesCard}>
          <Text style={styles.cardTitle}>Social</Text>

          <TouchableOpacity style={styles.activityButton} onPress={handleFlirt}>
            <View style={[styles.activityIconContainer, { backgroundColor: "#FF6B6B" }]}>
              <Ionicons name="heart" size={24} color="#fff" />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Flirter</Text>
              <Text style={styles.activityDescription}>Tentez votre chance en amour</Text>
              <Text style={styles.activityCost}>Coût: Gratuit</Text>
            </View>
          </TouchableOpacity>

          {isAdult && (
            <TouchableOpacity style={styles.activityButton} onPress={handleTravel}>
              <View style={[styles.activityIconContainer, { backgroundColor: "#FFD166" }]}>
                <Ionicons name="airplane" size={24} color="#fff" />
              </View>
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityTitle}>Voyager</Text>
                <Text style={styles.activityDescription}>Découvrez de nouveaux endroits</Text>
                <Text style={styles.activityCost}>Coût: 100€</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>Conseils</Text>
          <Text style={styles.tipText}>
            Équilibrez vos activités pour maintenir un bon niveau de bonheur et de santé. Certaines activités coûtent de
            l'argent, assurez-vous d'en avoir suffisamment!
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
  activitiesCard: {
    margin: 16,
    marginBottom: 0,
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
  activityButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  activityCost: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  tipsCard: {
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
    marginBottom: 30,
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
})

export default ActivitiesTab
