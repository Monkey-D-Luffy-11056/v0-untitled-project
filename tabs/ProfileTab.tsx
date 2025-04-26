import { StyleSheet, View, Text, ScrollView, Image } from "react-native"
import { useGame } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"

const ProfileTab = () => {
  const { character } = useGame()

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement du profil...</Text>
      </SafeAreaView>
    )
  }

  // Get avatar based on gender
  const getAvatar = () => {
    switch (character.gender) {
      case "male":
        return "https://i.imgur.com/JNNqJqX.png"
      case "female":
        return "https://i.imgur.com/8wEeX7G.png"
      case "nonbinary":
        return "https://i.imgur.com/YXOvdD5.png"
      default:
        return "https://i.imgur.com/YXOvdD5.png"
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Profil</Text>
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: getAvatar() }} style={styles.avatar} />
          <Text style={styles.name}>
            {character.firstName} {character.lastName}
          </Text>
          <Text style={styles.age}>{character.age} ans</Text>

          <View style={styles.traitsContainer}>
            {character.traits.map((trait, index) => (
              <View key={index} style={styles.traitBadge}>
                <Text style={styles.traitText}>
                  {trait.emoji} {trait.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Statistiques</Text>

          {/* Happiness Stat */}
          <View style={styles.statRow}>
            <View style={styles.statLabelContainer}>
              <Text style={styles.statEmoji}>😊</Text>
              <Text style={styles.statLabel}>Bonheur</Text>
            </View>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${character.stats.happiness}%`, backgroundColor: "#FFD166" }]} />
            </View>
            <Text style={styles.statValue}>{character.stats.happiness}%</Text>
          </View>

          {/* Health Stat */}
          <View style={styles.statRow}>
            <View style={styles.statLabelContainer}>
              <Text style={styles.statEmoji}>❤️</Text>
              <Text style={styles.statLabel}>Santé</Text>
            </View>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${character.stats.health}%`, backgroundColor: "#FF6B6B" }]} />
            </View>
            <Text style={styles.statValue}>{character.stats.health}%</Text>
          </View>

          {/* Intelligence Stat */}
          <View style={styles.statRow}>
            <View style={styles.statLabelContainer}>
              <Text style={styles.statEmoji}>🧠</Text>
              <Text style={styles.statLabel}>Intelligence</Text>
            </View>
            <View style={styles.statBarContainer}>
              <View
                style={[styles.statBar, { width: `${character.stats.intelligence}%`, backgroundColor: "#4ECDC4" }]}
              />
            </View>
            <Text style={styles.statValue}>{character.stats.intelligence}%</Text>
          </View>

          {/* Popularity Stat */}
          <View style={styles.statRow}>
            <View style={styles.statLabelContainer}>
              <Text style={styles.statEmoji}>😎</Text>
              <Text style={styles.statLabel}>Popularité</Text>
            </View>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${character.stats.popularity}%`, backgroundColor: "#9D65C9" }]} />
            </View>
            <Text style={styles.statValue}>{character.stats.popularity}%</Text>
          </View>

          {/* Wealth Stat */}
          <View style={styles.statRow}>
            <View style={styles.statLabelContainer}>
              <Text style={styles.statEmoji}>💰</Text>
              <Text style={styles.statLabel}>Richesse</Text>
            </View>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${character.stats.wealth}%`, backgroundColor: "#5D9C59" }]} />
            </View>
            <Text style={styles.statValue}>{character.stats.wealth}%</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informations</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Niveau d'études:</Text>
            <Text style={styles.infoValue}>
              {character.education.level === "primary" && "École Primaire"}
              {character.education.level === "middle" && "Collège"}
              {character.education.level === "high" && "Lycée"}
              {character.education.level === "university" && "Université"}
              {character.education.level === "none" && "Aucun"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Institution:</Text>
            <Text style={styles.infoValue}>{character.education.institution}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Emploi:</Text>
            <Text style={styles.infoValue}>
              {character.work.employed ? `${character.work.position} chez ${character.work.company}` : "Sans emploi"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Argent:</Text>
            <Text style={styles.infoValue}>{character.money} €</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Santé mentale:</Text>
            <Text style={styles.infoValue}>{character.mentalHealth}%</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Santé physique:</Text>
            <Text style={styles.infoValue}>{character.physicalHealth}%</Text>
          </View>
        </View>

        <View style={styles.relationshipsCard}>
          <Text style={styles.cardTitle}>Relations importantes</Text>

          {character.relationships.map((relation, index) => (
            <View key={index} style={styles.relationRow}>
              <Text style={styles.relationEmoji}>{relation.emoji}</Text>
              <View style={styles.relationInfo}>
                <Text style={styles.relationName}>{relation.name}</Text>
                <Text style={styles.relationType}>
                  {relation.type === "parent" && "Parent"}
                  {relation.type === "friend" && "Ami(e)"}
                  {relation.type === "romantic" && "Relation amoureuse"}
                  {relation.type === "colleague" && "Collègue"}
                </Text>
              </View>
              <View style={styles.relationBarContainer}>
                <View
                  style={[
                    styles.relationBar,
                    {
                      width: `${relation.level}%`,
                      backgroundColor: relation.level > 70 ? "#5D9C59" : relation.level > 40 ? "#FFD166" : "#FF6B6B",
                    },
                  ]}
                />
              </View>
            </View>
          ))}
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
  profileCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  age: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  traitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
  traitBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  traitText: {
    fontSize: 14,
    color: "#333",
  },
  statsCard: {
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
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  statEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  statBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 8,
  },
  statBar: {
    height: "100%",
    borderRadius: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    width: 40,
    textAlign: "right",
  },
  infoCard: {
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#555",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  relationshipsCard: {
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
  relationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  relationEmoji: {
    fontSize: 24,
    marginRight: 12,
    width: 30,
    textAlign: "center",
  },
  relationInfo: {
    width: 120,
  },
  relationName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  relationType: {
    fontSize: 12,
    color: "#666",
  },
  relationBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  relationBar: {
    height: "100%",
    borderRadius: 4,
  },
})

export default ProfileTab
