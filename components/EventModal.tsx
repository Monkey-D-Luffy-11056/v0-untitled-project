import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"
import { useGame, type GameEvent } from "../context/GameContext"

type EventModalProps = {
  event: GameEvent
}

const EventModal = ({ event }: EventModalProps) => {
  const { resolveEvent } = useGame()

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventEmoji}>{event.emoji}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>

          <Text style={styles.eventDescription}>{event.description}</Text>

          <View style={styles.choicesContainer}>
            {event.choices.map((choice, index) => (
              <TouchableOpacity key={index} style={styles.choiceButton} onPress={() => resolveEvent(index)}>
                <Text style={styles.choiceEmoji}>{choice.emoji}</Text>
                <Text style={styles.choiceText}>{choice.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  eventEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  eventDescription: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  choicesContainer: {
    marginTop: 8,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  choiceEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  choiceText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
})

export default EventModal
