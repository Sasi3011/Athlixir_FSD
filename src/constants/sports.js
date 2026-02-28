/**
 * Sports list and categories per sport for athlete onboarding
 */
export const SPORTS_LIST = [
  "Athletics", "Badminton", "Basketball", "Boxing", "Cricket", "Football",
  "Hockey", "Judo", "Kabaddi", "Swimming", "Table Tennis", "Tennis",
  "Volleyball", "Weightlifting", "Wrestling", "Archery", "Cycling",
  "Gymnastics", "Shooting", "Other"
];

export const SPORT_CATEGORIES = {
  Athletics: ["Sprints", "Long Distance", "Jumps", "Throws", "Middle Distance", "Hurdles", "Race Walk", "Other"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Basketball: ["Guard", "Forward", "Center", "Other"],
  Boxing: ["Flyweight", "Bantamweight", "Featherweight", "Lightweight", "Welterweight", "Middleweight", "Heavyweight", "Other"],
  Cricket: ["Batting", "Bowling", "All-Rounder", "Wicketkeeper", "Other"],
  Football: ["Forward", "Midfielder", "Defender", "Goalkeeper", "Other"],
  Hockey: ["Forward", "Midfielder", "Defender", "Goalkeeper", "Other"],
  Judo: ["Extra Light", "Half Light", "Light", "Half Middle", "Middle", "Half Heavy", "Heavy", "Other"],
  Kabaddi: ["Raider", "Defender", "All-Rounder", "Other"],
  Swimming: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "Individual Medley", "Other"],
  "Table Tennis": ["Singles", "Doubles", "Mixed Doubles"],
  Tennis: ["Singles", "Doubles", "Mixed Doubles"],
  Volleyball: ["Setter", "Outside Hitter", "Middle Blocker", "Opposite", "Libero", "Other"],
  Weightlifting: ["Snatch", "Clean & Jerk", "Combined", "Other"],
  Wrestling: ["Freestyle", "Greco-Roman", "Other"],
  Archery: ["Recurve", "Compound", "Other"],
  Cycling: ["Road", "Track", "MTB", "BMX", "Other"],
  Gymnastics: ["Artistic", "Rhythmic", "Trampoline", "Other"],
  Shooting: ["Rifle", "Pistol", "Shotgun", "Other"],
  Other: ["Other"]
};

export const SPORTS_REQUIRING_DOMINANT_HAND = [
  "Badminton", "Table Tennis", "Tennis", "Cricket", "Boxing", "Archery", "Shooting", "Other"
];

export const CURRENT_LEVELS = [
  { value: "school", label: "School" },
  { value: "college", label: "College" },
  { value: "district", label: "District" },
  { value: "state", label: "State" },
  { value: "national", label: "National" }
];

export const PREFERRED_TRAINING_TYPES = [
  "Individual", "Group", "Academy", "Mixed", "Not Specified"
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DISABILITY_CATEGORIES = [
  "Visual", "Hearing", "Locomotor", "Intellectual", "Multiple", "Other"
];
