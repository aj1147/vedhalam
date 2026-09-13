// HealthCheck AI Absurd Diagnostic Engine with Direct Groq Cloud AI Integration

export interface MedicalDiagnosisResult {
  term: string;
  conditionName: string;
  confidence: string;
  uselessComment: string;
  ridiculousSolution: string;
  riskScore: string;
  isAiGenerated?: boolean;
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
    riskScore,
    isAiGenerated: false
  };
}

export async function analyzeSymptomsWithGroq(symptoms: string): Promise<MedicalDiagnosisResult> {
  const apiKey =
    import.meta.env.VITE_GROQ_API_KEY ;

  if (!apiKey) {
    return generateAbsurdDiagnosis(symptoms);
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `You are HealthCheck AI, an ultra-advanced sci-fi & biometric diagnostic terminal for the Vedhalam portal. Analyze the user's reported symptoms and generate a diagnostic scan report tailored specifically to their input.
Return ONLY valid JSON matching this exact schema:
{
  "term": "Sci-Fi Medical Term tailored to symptoms",
  "conditionName": "Diagnosis description reflecting symptoms in deadpan/humorous tone",
  "confidence": "e.g. 98.4% chance of existence",
  "uselessComment": "Sarcastic or useless telemetry comment",
  "ridiculousSolution": "A bizarre, funny recommended action/remedy tailored to their symptoms (feel free to include Malayalam phrases like 'Ellam sheri aavum')",
  "riskScore": "e.g. 840% Nominal (Hyper-Critical)"
}`
          },
          {
            role: "user",
            content: `Patient Input Symptoms: ${symptoms}`
          }
        ],
        temperature: 0.7,
        max_tokens: 400
      })
    });

    if (!response.ok) {
      console.warn("Groq API call returned non-OK status:", response.status);
      return generateAbsurdDiagnosis(symptoms);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
    
    // Extract JSON string from raw response if formatted in markdown block
    const cleanJson = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return {
      term: String(parsed.term || "Sub-Quantum Biometric Flux"),
      conditionName: String(parsed.conditionName || "Acute Quantum Intestinal Overdrive"),
      confidence: String(parsed.confidence || "99.1% chance you exist"),
      uselessComment: String(parsed.uselessComment || "Please refrain from blinking."),
      ridiculousSolution: String(parsed.ridiculousSolution || "Malayalam quote: Ellam sheri aavum!"),
      riskScore: String(parsed.riskScore || "990% Hyper-Critical"),
      isAiGenerated: true
    };
  } catch (err) {
    console.error("Groq Direct API error, using fallback:", err);
    return generateAbsurdDiagnosis(symptoms);
  }
}
