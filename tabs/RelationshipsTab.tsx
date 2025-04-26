"use client"

import { useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from "react-native"
import { useGame, type Relationship } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const RelationshipsTab = () => {
  const { character, updateCharacter } = useGame()
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null)
  const [showRelationshipModal, setShowRelationshipModal] = useState(false)

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    )
  }

  const handleRelationshipSelect = (relationship: Relationship) => {
    setSelectedRelationship(relationship)
    setShowRelationshipModal(true)
  }

  const handleTalk = () => {
    if (selectedRelationship) {
      const updatedRelationships = character.relationships.map((rel) => {
        if (rel.id === selectedRelationship.id) {
          return {
            ...rel,
            level: Math.min(100, rel.level + 5),
          }
        }
        return rel
      })

      updateCharacter({
        relationships: updatedRelationships,
        stats: {
          ...character.stats,
          happiness: Math.min(100, character.stats.happiness + 2),
        },
      })

      setShowRelationshipModal(false)
      alert(`Vous avez discuté avec ${selectedRelationship.name}. Votre relation s'est améliorée!`)
    }
  }

  const handleHangOut = () => {
    if (selectedRelationship) {
      const updatedRelationships = character.relationships.map((rel) => {
        if (rel.id === selectedRelationship.id) {
          return {
            ...rel,
            level: Math.min(100, rel.level + 10),
          }
        }
        return rel
      })

      updateCharacter({
        relationships: updatedRelationships,
        stats: {
          ...character.stats,
          happiness: Math.min(100, character.stats.happiness + 5),
        },
        money: Math.max(0, character.money - 20),
      })

      setShowRelationshipModal(false)
      alert(`Vous êtes sorti avec ${selectedRelationship.name}. Votre relation s'est beaucoup améliorée! (-20€)`)
    }
  }

  const handleGift = () => {
    if (selectedRelationship && character.money >= 50) {
      const updatedRelationships = character.relationships.map((rel) => {
        if (rel.id === selectedRelationship.id) {
          return {
            ...rel,
            level: Math.min(100, rel.level + 15),
          }
        }
        return rel
      })

      updateCharacter({
        relationships: updatedRelationships,
        stats: {
          ...character.stats,
          happiness: Math.min(100, character.stats.happiness + 3),
        },
        money: character.money - 50,
      })

      setShowRelationshipModal(false)
      alert(
        `Vous avez offert un cadeau à ${selectedRelationship.name}. Votre relation s'est considérablement améliorée! (-50€)`,
      )
    } else if (character.money < 50) {
      alert("Vous n'avez pas assez d'argent pour offrir un cadeau!")
    }
  }

  const handleArgue = () => {
    if (selectedRelationship) {
      const updatedRelationships = character.relationships.map((rel) => {
        if (rel.id === selectedRelationship.id) {
          return {
            ...rel,
            level: Math.max(0, rel.level - 15),
          }
        }
        return rel
      })

      updateCharacter({
        relationships: updatedRelationships,
        stats: {
          ...character.stats,
          happiness: Math.max(0, character.stats.happiness - 5),
        },
      })

      setShowRelationshipModal(false)
      alert(`Vous vous êtes disputé avec ${selectedRelationship.name}. Votre relation s'est détériorée!`)
    }
  }

  const getRelationshipStatus = (level: number) => {
    if (level >= 90) return "Excellent"
    if (level >= 70) return "Très bon"
    if (level >= 50) return "Bon"
    if (level >= 30) return "Moyen"
    if (level >= 10) return "Mauvais"
    return "Terrible"
  }

  const getRelationshipColor = (level: number) => {
    if (level >= 70) return "#5D9C59"
    if (level >= 40) return "#FFD166"
    return "#FF6B6B"
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Relations</Text>
        </View>

        <View style={styles.relationshipsCard}>
          <Text style={styles.cardTitle}>Mes Relations</Text>

          {character.relationships.map((relationship) => (
            <TouchableOpacity
              key={relationship.id}
              style={styles.relationshipItem}
              onPress={() => handleRelationshipSelect(relationship)}
            >
              <View style={styles.relationshipHeader}>
                <Text style={styles.relationshipEmoji}>{relationship.emoji}</Text>
                <View style={styles.relationshipInfo}>
                  <Text style={styles.relationshipName}>{relationship.name}</Text>
                  <Text style={styles.relationshipType}>
                    {relationship.type === "parent" && "Parent"}
                    {relationship.type === "friend" && "Ami(e)"}
                    {relationship.type === "romantic" && "Relation amoureuse"}
                    {relationship.type === "colleague" && "Collègue"}
                  </Text>
                </View>
                <View style={styles.relationshipStatus}>
                  <Text style={[styles.relationshipStatusText, { color: getRelationshipColor(relationship.level) }]}>
                    {getRelationshipStatus(relationship.level)}
                  </Text>
                </View>
              </View>

              <View style={styles.relationshipBarContainer}>
                <View
                  style={[
                    styles.relationshipBar,
                    {
                      width: `${relationship.level}%`,
                      backgroundColor: getRelationshipColor(relationship.level),
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>Conseils</Text>
          <Text style={styles.tipText}>
            Entretenir de bonnes relations est essentiel pour votre bonheur. Passez du temps avec vos proches et
            n'hésitez pas à leur offrir des cadeaux pour renforcer vos liens!
          </Text>
        </View>

        {/* Relationship Interaction Modal */}
        <Modal
          visible={showRelationshipModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowRelationshipModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedRelationship && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalEmoji}>{selectedRelationship.emoji}</Text>
                    <Text style={styles.modalTitle}>{selectedRelationship.name}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setShowRelationshipModal(false)}>
                      <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalInfo}>
                    <Text style={styles.modalInfoLabel}>Type:</Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedRelationship.type === "parent" && "Parent"}
                      {selectedRelationship.type === "friend" && "Ami(e)"}
                      {selectedRelationship.type === "romantic" && "Relation amoureuse"}
                      {selectedRelationship.type === "colleague" && "Collègue"}
                    </Text>
                  </View>

                  <View style={styles.modalInfo}>
                    <Text style={styles.modalInfoLabel}>Relation:</Text>
                    <Text style={[styles.modalInfoValue, { color: getRelationshipColor(selectedRelationship.level) }]}>
                      {getRelationshipStatus(selectedRelationship.level)} ({selectedRelationship.level}%)
                    </Text>
                  </View>

                  <View style={styles.modalBarContainer}>
                    <View
                      style={[
                        styles.modalBar,
                        {
                          width: `${selectedRelationship.level}%`,
                          backgroundColor: getRelationshipColor(selectedRelationship.level),
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.modalActionsTitle}>Interactions</Text>

                  <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.modalAction} onPress={handleTalk}>
                      <View style={[styles.modalActionIcon, { backgroundColor: "#4ECDC4" }]}>
                        <Ionicons name="chatbubbles" size={24} color="#fff" />
                      </View>
                      <Text style={styles.modalActionText}>Discuter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalAction} onPress={handleHangOut}>
                      <View style={[styles.modalActionIcon, { backgroundColor: "#9D65C9" }]}>
                        <Ionicons name="film" size={24} color="#fff" />
                      </View>
                      <Text style={styles.modalActionText}>Sortir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalAction} onPress={handleGift}>
                      <View style={[styles.modalActionIcon, { backgroundColor: "#FFD166" }]}>
                        <Ionicons name="gift" size={24} color="#fff" />
                      </View>
                      <Text style={styles.modalActionText}>Cadeau</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalAction} onPress={handleArgue}>
                      <View style={[styles.modalActionIcon, { backgroundColor: "#FF6B6B" }]}>
                        <Ionicons name="thunderstorm" size={24} color="#fff" />
                      </View>
                      <Text style={styles.modalActionText}>Disputer</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
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
  relationshipsCard: {
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
  relationshipItem: {
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  relationshipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  relationshipEmoji: {
    fontSize: 24,
    marginRight: 12,
    width: 30,
    textAlign: "center",
  },
  relationshipInfo: {
    flex: 1,
  },
  relationshipName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  relationshipType: {
    fontSize: 12,
    color: "#666",
  },
  relationshipStatus: {
    marginLeft: 8,
  },
  relationshipStatusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  relationshipBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  relationshipBar: {
    height: "100%",
    borderRadius: 4,
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
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  modalEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalInfoLabel: {
    fontSize: 14,
    color: "#555",
  },
  modalInfoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  modalBarContainer: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 12,
  },
  modalBar: {
    height: "100%",
    borderRadius: 5,
  },
  modalActionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalAction: {
    width: "48%",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  modalActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  modalActionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
})

export default RelationshipsTab
