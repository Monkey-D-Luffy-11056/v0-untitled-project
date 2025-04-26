"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { generateRandomEvents } from "../utils/events"

// Define types
export type Trait = {
  name: string
  emoji: string
  description: string
}

export type Relationship = {
  id: string
  name: string
  type: "parent" | "friend" | "romantic" | "colleague"
  level: number // 0-100
  emoji: string
}

export type Character = {
  firstName: string
  lastName: string
  gender: "male" | "female" | "nonbinary"
  birthDate: Date
  traits: Trait[]
  stats: {
    happiness: number // 0-100
    health: number // 0-100
    intelligence: number // 0-100
    popularity: number // 0-100
    wealth: number // 0-100
  }
  age: number
  relationships: Relationship[]
  education: {
    level: "primary" | "middle" | "high" | "university" | "none"
    grades: number // 0-100
    institution: string
  }
  work: {
    employed: boolean
    company: string
    position: string
    salary: number
    satisfaction: number // 0-100
  }
  money: number
  mentalHealth: number // 0-100
  physicalHealth: number // 0-100
  criminalRecord: number // 0-100, higher means more criminal
}

export type GameEvent = {
  id: string
  title: string
  description: string
  emoji: string
  choices: {
    text: string
    emoji: string
    effect: (character: Character) => Character
  }[]
}

type GameContextType = {
  character: Character | null
  createCharacter: (character: Character) => void
  updateCharacter: (updates: Partial<Character>) => void
  currentEvent: GameEvent | null
  resolveEvent: (choiceIndex: number) => void
  ageUp: () => void
  gameStarted: boolean
  startGame: () => void
}

const defaultContext: GameContextType = {
  character: null,
  createCharacter: () => {},
  updateCharacter: () => {},
  currentEvent: null,
  resolveEvent: () => {},
  ageUp: () => {},
  gameStarted: false,
  startGame: () => {},
}

const GameContext = createContext<GameContextType>(defaultContext)

export const useGame = () => useContext(GameContext)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<Character | null>(null)
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [eventQueue, setEventQueue] = useState<GameEvent[]>([])

  // Initialize with some events when character is created
  useEffect(() => {
    if (character && gameStarted && eventQueue.length === 0) {
      const newEvents = generateRandomEvents(character, 3)
      setEventQueue(newEvents)
    }
  }, [character, gameStarted, eventQueue.length])

  // Set current event from queue
  useEffect(() => {
    if (eventQueue.length > 0 && !currentEvent) {
      setCurrentEvent(eventQueue[0])
      setEventQueue(eventQueue.slice(1))
    }
  }, [eventQueue, currentEvent])

  const createCharacter = (newCharacter: Character) => {
    setCharacter(newCharacter)
  }

  const updateCharacter = (updates: Partial<Character>) => {
    if (character) {
      setCharacter({ ...character, ...updates })
    }
  }

  const resolveEvent = (choiceIndex: number) => {
    if (character && currentEvent) {
      const choice = currentEvent.choices[choiceIndex]
      const updatedCharacter = choice.effect(character)
      setCharacter(updatedCharacter)
      setCurrentEvent(null)

      // Generate a new event occasionally
      if (Math.random() > 0.7) {
        const newEvents = generateRandomEvents(updatedCharacter, 1)
        setEventQueue([...eventQueue, ...newEvents])
      }
    }
  }

  const ageUp = () => {
    if (character) {
      const newAge = character.age + 1
      const newEvents = generateRandomEvents(character, 2)

      // Update character stats based on age
      const updatedCharacter = {
        ...character,
        age: newAge,
        stats: {
          ...character.stats,
          // Natural changes with age
          health: Math.max(0, Math.min(100, character.stats.health - Math.floor(Math.random() * 5))),
          intelligence: Math.min(100, character.stats.intelligence + Math.floor(Math.random() * 3)),
        },
      }

      setCharacter(updatedCharacter)
      setEventQueue([...eventQueue, ...newEvents])
    }
  }

  const startGame = () => {
    setGameStarted(true)
  }

  return (
    <GameContext.Provider
      value={{
        character,
        createCharacter,
        updateCharacter,
        currentEvent,
        resolveEvent,
        ageUp,
        gameStarted,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
