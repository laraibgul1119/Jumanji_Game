export const TRACK_POINTS = [
  [10, 90], // 0: Home
  [14, 85], [18, 80], [22, 75],
  [28, 73], [34, 73], [38, 76], [40, 81],
  [38, 87], [32, 89], [26, 88], [21, 84],
  [18, 78], [17, 71], [18, 64], [22, 59],
  [28, 56], [35, 56], [41, 59], [45, 64],
  [47, 70], [45, 74], [40, 75], [36, 71],
  [34, 65], [37, 59], [42, 54],
  [46, 51], [50, 50]
];

export const MAX_POSITION = 28;

export interface Riddle {
  text: string;
  answer: string;
}

export const RIDDLES: Riddle[] = [
  { text: "A tiny bite can make you itch, make you sneeze, make you twitch.", answer: "Mosquitoes" },
  { text: "This will not be an easy mission, monkeys slow the expedition.", answer: "Monkeys" },
  { text: "His fangs are sharp, he likes your taste. Your party better move with haste.", answer: "Lion" },
  { text: "They grow much faster than bamboo, take care or they'll come after you.", answer: "Giant Vines" },
  { text: "A hunter from the darkest wild makes you feel just like a child.", answer: "Van Pelt" },
  { text: "Don't be fooled, it isn't thunder. Staying put would be a blunder.", answer: "Stampede" },
  { text: "Every month at the quarter moon, there'll be a monsoon in your lagoon.", answer: "Monsoon" },
  { text: "Beware the ground on which you stand, the floor is quicker than the sand.", answer: "Quicksand" },
  { text: "There is a lesson you will learn, sometimes you must go back a turn.", answer: "Go Back" },
  { text: "You're almost there with much at stake, but now the ground begins to quake.", answer: "Earthquake" },
  { text: "It's a jungle out there, beware of the dangers that lurk in the air.", answer: "Poison Darts" },
  { text: "Need a hand, well you just wait, we'll help you out, we each have eight.", answer: "Spiders" },
  { text: "At night they fly, you better run, these winged things are not much fun.", answer: "Bats" }
];
