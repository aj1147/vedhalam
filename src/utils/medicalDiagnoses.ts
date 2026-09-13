// HealthCheck AI Absurd Diagnostic Engine

export interface MedicalDiagnosisResult {
  term: string;
  conditionName: string;
  confidence: string;
  uselessComment: string;
  ridiculousSolution: string;
  riskScore: string;
}

const PSEUDO_TERMS = [
  "Glorbenzymatic Flux",
  "Hyper-Polygonal Sub-Dermal Syndrome",
  "Retrograde Chromo-Spasm",
  "Ultra-Myofascial Sphenoidosis",
  "Sub-Quantum Duodenal Resonance",
  "Pseudo-Cerebral Orbital Disconnection",
  "Exo-Skeletal Carbonate Malfunction",
  "Metabolic Disco-Dystrophy"
];

const DEADPAN_DIAGNOSES = [
  "Diagnosis: You appear to be a person.",
  "You are having a heart attack (or possibly just ate hot soup).",
  "You're having 'Acute Quantum Intestinal Overdrive'.",
  "Diagnosis: Patient is 97.2% likely to exist right now.",
  "Diagnosis: Excessive presence of organic matter.",
  "Diagnosis: Severe case of Existing in the 21st Century.",
  "Diagnosis: You suffer from Terminal Gravity Attraction."
];

const USELESS_COMMENTS = [
  "Are you still Alive?",
  "Are you still breathing right now?",
  "Shall we notify your nearest pet?",
  "Do not make eye contact with your reflection for 10 minutes.",
  "Please refrain from blinking until the scan completes.",
  "Your vitals suggest you might be made of atoms."
];

const RIDICULOUS_SOLUTIONS = [
  "Drink 200ml of motor oil to become fully human.",
  "Do a headstand while running 10 kilometers.",
  "Malayalam quote: 'Fiza verum Ellam sheri aavum' (എല്ലാം ശരിയാവും - Everything will be okay!)",
  "Apply salted butter directly onto your Wi-Fi router.",
  "Apologize to your liver out loud in public.",
  "Spin around 3 times and whisper 'Macaroni' to your knee.",
  "Stare intensely at a potato for 45 minutes to balance your flux."
];

export function generateAbsurdDiagnosis(_symptoms: string): MedicalDiagnosisResult {
  const term = PSEUDO_TERMS[Math.floor(Math.random() * PSEUDO_TERMS.length)];
  const conditionName = DEADPAN_DIAGNOSES[Math.floor(Math.random() * DEADPAN_DIAGNOSES.length)];
  const confidence = (85 + Math.random() * 14.9).toFixed(1) + "% chance you exist";
  const uselessComment = USELESS_COMMENTS[Math.floor(Math.random() * USELESS_COMMENTS.length)];
  const ridiculousSolution = RIDICULOUS_SOLUTIONS[Math.floor(Math.random() * RIDICULOUS_SOLUTIONS.length)];
  const riskScore = `${(Math.random() * 800 + 100).toFixed(0)}% Nominal (Hyper-Critical)`;

  return {
    term,
    conditionName,
    confidence,
    uselessComment,
    ridiculousSolution,
    riskScore
  };
}
