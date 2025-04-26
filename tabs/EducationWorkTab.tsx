import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useGame } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"

const EducationWorkTab = () => {
  const { character, updateCharacter } = useGame()

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    )
  }

  const handleStudy = () => {
    // Increase intelligence, decrease happiness slightly
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        intelligence: Math.min(100, character.stats.intelligence + 5),
        happiness: Math.max(0, character.stats.happiness - 2),
      },
      education: {
        ...character.education,
        grades: Math.min(100, character.education.grades + 3),
      },
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez étudié dur et votre intelligence a augmenté!")
  }

  const handleSkipClass = () => {
    // Decrease grades, increase happiness temporarily
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.min(100, character.stats.happiness + 5),
      },
      education: {
        ...character.education,
        grades: Math.max(0, character.education.grades - 5),
      },
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez séché les cours. Votre bonheur a augmenté mais vos notes ont baissé!")
  }

  const handleJoinClub = () => {
    // Increase popularity and happiness
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        popularity: Math.min(100, character.stats.popularity + 7),
        happiness: Math.min(100, character.stats.happiness + 3),
      },
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez rejoint un club! Votre popularité a augmenté.")
  }

  const handleWorkHard = () => {
    // Increase salary potential, decrease happiness slightly
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        happiness: Math.max(0, character.stats.happiness - 3),
        wealth: Math.min(100, character.stats.wealth + 3),
      },
      work: {
        ...character.work,
        satisfaction: Math.min(100, character.work.satisfaction + 2),
      },
      money: character.money + character.work.salary * 0.1,
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez travaillé dur! Votre richesse a légèrement augmenté.")
  }

  const handleSocialize = () => {
    // Increase popularity, happiness
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        popularity: Math.min(100, character.stats.popularity + 5),
        happiness: Math.min(100, character.stats.happiness + 4),
      },
    }
    updateCharacter(updatedCharacter)
    alert("Vous avez socialisé avec vos collègues! Votre popularité a augmenté.")
  }

  const handleLookForJob = () => {
    // Simple job search simulation
    alert("Cette fonctionnalité sera disponible dans une future mise à jour!")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{character.work.employed ? "Travail" : "Éducation"}</Text>
        </View>

        {!character.work.employed ? (
          // Education Section
          <View>
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="school" size={24} color="#4ECDC4" />
                <Text style={styles.cardTitle}>Information Scolaire</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Niveau:</Text>
                <Text style={styles.infoValue}>
                  {character.education.level === "primary" && "École Primaire"}
                  {character.education.level === "middle" && "Collège"}
                  {character.education.level === "high" && "Lycée"}
                  {character.education.level === "university" && "Université"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Institution:</Text>
                <Text style={styles.infoValue}>{character.education.institution}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Notes:</Text>
                <View style={styles.gradesContainer}>
                  <View style={styles.gradesBarContainer}>
                    <View
                      style={[
                        styles.gradesBar,
                        {
                          width: `${character.education.grades}%`,
                          backgroundColor:
                            character.education.grades > 70
                              ? "#5D9C59"
                              : character.education.grades > 50
                                ? "#FFD166"
                                : "#FF6B6B",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.gradesText}>{character.education.grades}%</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionsCard}>
              <Text style={styles.cardTitle}>Actions</Text>

              <TouchableOpacity style={styles.actionButton} onPress={handleStudy}>
                <View style={styles.actionIconContainer}>
                  <Ionicons name="book" size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Étudier</Text>
                  <Text style={styles.actionDescription}>Améliore vos notes et votre intelligence</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleSkipClass}>
                <View style={[styles.actionIconContainer, { backgroundColor: "#FF6B6B" }]}>
                  <FontAwesome5 name="running" size={20} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Sécher les cours</Text>
                  <Text style={styles.actionDescription}>Augmente votre bonheur mais baisse vos notes</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleJoinClub}>
                <View style={[styles.actionIconContainer, { backgroundColor: "#9D65C9" }]}>
                  <Ionicons name="people" size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Rejoindre un club</Text>
                  <Text style={styles.actionDescription}>Augmente votre popularité et vos relations</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Work Section
          <View>
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="briefcase" size={24} color="#5D9C59" />
                <Text style={styles.cardTitle}>Information Professionnelle</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Entreprise:</Text>
                <Text style={styles.infoValue}>{character.work.company}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Poste:</Text>
                <Text style={styles.infoValue}>{character.work.position}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Salaire:</Text>
                <Text style={styles.infoValue}>{character.work.salary} €/mois</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Satisfaction:</Text>
                <View style={styles.gradesContainer}>
                  <View style={styles.gradesBarContainer}>
                    <View
                      style={[
                        styles.gradesBar,
                        {
                          width: `${character.work.satisfaction}%`,
                          backgroundColor:
                            character.work.satisfaction > 70
                              ? "#5D9C59"
                              : character.work.satisfaction > 50
                                ? "#FFD166"
                                : "#FF6B6B",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.gradesText}>{character.work.satisfaction}%</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionsCard}>
              <Text style={styles.cardTitle}>Actions</Text>

              <TouchableOpacity style={styles.actionButton} onPress={handleWorkHard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons name="trending-up" size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Travailler dur</Text>
                  <Text style={styles.actionDescription}>Augmente votre salaire potentiel</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleSocialize}>
                <View style={[styles.actionIconContainer, { backgroundColor: "#9D65C9" }]}>
                  <Ionicons name="chatbubbles" size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Socialiser</Text>
                  <Text style={styles.actionDescription}>Améliore vos relations avec vos collègues</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleLookForJob}>
                <View style={[styles.actionIconContainer, { backgroundColor: "#FFD166" }]}>
                  <Ionicons name="search" size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Chercher un nouvel emploi</Text>
                  <Text style={styles.actionDescription}>Explorez de nouvelles opportunités de carrière</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>Conseils</Text>
          <Text style={styles.tipText}>
            {!character.work.employed
              ? "Maintenir de bonnes notes vous ouvrira plus d'opportunités à l'avenir. N'oubliez pas de rejoindre des clubs pour développer vos compétences sociales!"
              : "Travailler dur peut mener à des promotions, mais n'oubliez pas de maintenir un équilibre entre vie professionnelle et personnelle pour votre bonheur!"}
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
  infoCard: {
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  gradesContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  gradesBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
  },
  gradesBar: {
    height: "100%",
    borderRadius: 4,
  },
  gradesText: {
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
    width: 40,
    height: 40,
    borderRadius: 20,
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

export default EducationWorkTab
