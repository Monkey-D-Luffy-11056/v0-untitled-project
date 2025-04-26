import type { Character, GameEvent } from "../context/GameContext"

// Generate random events based on character state
export const generateRandomEvents = (character: Character, count: number): GameEvent[] => {
  const events: GameEvent[] = []

  // Pool of possible events
  const possibleEvents = [
    // School events
    {
      id: "exam",
      title: "Examen Important",
      description: "Un examen important approche. Comment vous préparez-vous?",
      emoji: "📝",
      choices: [
        {
          text: "Étudier intensément",
          emoji: "📚",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              intelligence: Math.min(100, char.stats.intelligence + 5),
              happiness: Math.max(0, char.stats.happiness - 3),
            },
            education: {
              ...char.education,
              grades: Math.min(100, char.education.grades + 10),
            },
          }),
        },
        {
          text: "Étudier modérément",
          emoji: "📖",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              intelligence: Math.min(100, char.stats.intelligence + 2),
            },
            education: {
              ...char.education,
              grades: Math.min(100, char.education.grades + 5),
            },
          }),
        },
        {
          text: "Ne pas étudier",
          emoji: "🎮",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.min(100, char.stats.happiness + 5),
            },
            education: {
              ...char.education,
              grades: Math.max(0, char.education.grades - 10),
            },
          }),
        },
      ],
    },
    // Friendship events
    {
      id: "friend_invite",
      title: "Invitation d'un ami",
      description: "Un ami vous invite à une fête ce week-end. Qu'allez-vous faire?",
      emoji: "🎉",
      choices: [
        {
          text: "Y aller et socialiser",
          emoji: "🥳",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.min(100, char.stats.happiness + 10),
              popularity: Math.min(100, char.stats.popularity + 8),
              health: Math.max(0, char.stats.health - 3),
            },
            money: Math.max(0, char.money - 20),
          }),
        },
        {
          text: "Y aller mais rester discret",
          emoji: "😊",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.min(100, char.stats.happiness + 5),
              popularity: Math.min(100, char.stats.popularity + 3),
            },
            money: Math.max(0, char.money - 10),
          }),
        },
        {
          text: "Refuser l'invitation",
          emoji: "🏠",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.max(0, char.stats.happiness - 5),
              popularity: Math.max(0, char.stats.popularity - 3),
            },
          }),
        },
      ],
    },
    // Health events
    {
      id: "sick",
      title: "Vous êtes malade",
      description: "Vous vous sentez mal et avez de la fièvre. Que faites-vous?",
      emoji: "🤒",
      choices: [
        {
          text: "Aller chez le médecin",
          emoji: "👨‍⚕️",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              health: Math.min(100, char.stats.health + 15),
            },
            money: Math.max(0, char.money - 30),
          }),
        },
        {
          text: "Se reposer à la maison",
          emoji: "🛌",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              health: Math.min(100, char.stats.health + 5),
              happiness: Math.max(0, char.stats.happiness - 3),
            },
          }),
        },
        {
          text: "Ignorer et continuer normalement",
          emoji: "💪",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              health: Math.max(0, char.stats.health - 10),
            },
          }),
        },
      ],
    },
    // Money events
    {
      id: "found_money",
      title: "Argent trouvé",
      description: "Vous avez trouvé un portefeuille avec 50€ et une carte d'identité. Que faites-vous?",
      emoji: "💰",
      choices: [
        {
          text: "Le rendre à son propriétaire",
          emoji: "😇",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.min(100, char.stats.happiness + 5),
            },
          }),
        },
        {
          text: "Garder l'argent",
          emoji: "💸",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.min(100, char.stats.happiness + 3),
              wealth: Math.min(100, char.stats.wealth + 2),
            },
            money: char.money + 50,
            criminalRecord: Math.min(100, char.criminalRecord + 5),
          }),
        },
        {
          text: "Le remettre à la police",
          emoji: "👮",
          effect: (char: Character) => ({
            ...char,
            stats: {
              ...char.stats,
              happiness: Math.min(100, char.stats.happiness + 8),
            },
          }),
        },
      ],
    },
    // Relationship events
    {
      id: "crush",
      title: "Un béguin",
      description: "Quelqu'un à l'école/travail semble s'intéresser à vous. Comment réagissez-vous?",
      emoji: "❤️",
      choices: [
        {
          text: "Flirter en retour",
          emoji: "😘",
          effect: (char: Character) => {
            // Add a new relationship if successful
            const success = Math.random() > 0.3
            if (success) {
              const newRelationship = {
                id: `romantic-${Date.now()}`,
                name: Math.random() > 0.5 ? "Emma" : "Lucas",
                type: "romantic" as const,
                level: 60 + Math.floor(Math.random() * 20),
                emoji: Math.random() > 0.5 ? "👩" : "👨",
              }

              return {
                ...char,
                stats: {
                  ...char.stats,
                  happiness: Math.min(100, char.stats.happiness + 15),
                },
                relationships: [...char.relationships, newRelationship],
              }
            } else {
              return {
                ...char,
                stats: {
                  ...char.stats,
                  happiness: Math.max(0, char.stats.happiness - 10),
                },
              }
            }
          },
        },
        {
          text: "Rester amical",
          emoji: "🙂",
          effect: (char: Character) => {
            // Add a new friend relationship
            const newRelationship = {
              id: `friend-${Date.now()}`,
              name: Math.random() > 0.5 ? "Emma" : "Lucas",
              type: "friend" as const,
              level: 50 + Math.floor(Math.random() * 20),
              emoji: Math.random() > 0.5 ? "👩" : "👨",
            }

            return {
              ...char,
              stats: {
                ...char.stats,
                happiness: Math.min(100, char.stats.happiness + 5),
              },
              relationships: [...char.relationships, newRelationship],
            }
          },
        },
        {
          text: "Ignorer",
          emoji: "🙄",
          effect: (char: Character) => ({
            ...char,
          }),
        },
      ],
    },
  ]

  // Filter events based on character state
  let filteredEvents = [...possibleEvents]

  // If character is in school, prioritize school events
  if (!character.work.employed) {
    filteredEvents = filteredEvents.filter((e) => e.id !== "work_promotion")
  }

  // Randomly select events
  for (let i = 0; i < count; i++) {
    if (filteredEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredEvents.length)
      events.push(filteredEvents[randomIndex])

      // Remove the selected event to avoid duplicates
      filteredEvents.splice(randomIndex, 1)
    }
  }

  return events
}
