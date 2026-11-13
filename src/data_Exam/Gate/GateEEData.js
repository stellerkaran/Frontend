// GATE Electrical Engineering (EE) Syllabus & PYQ Data Bank

export const GATE_EE_SUBJECTS = [
  {
    id: "engineering-mathematics",
    slug: "engineering-mathematics",
    code: "EM",
    title: "Engineering Mathematics",
    shortName: "Engineering Maths",
    chaptersCount: 5,
    weightage: "13 Marks",
    weightageNum: 13,
    questionCount: 195,
    years: "2018 – 2024",
    difficulty: "High Scoring & Core",
    iconName: "Sigma",
    accentColor: "#f59e0b",
    bgLight: "#fffbeb",
    borderLight: "#fde68a",
    badge: "13 Marks Compulsory",
    description: "Linear Algebra, Calculus, Differential equations, Complex variables, Probability & Statistics, Numerical Methods.",
    topics: [
      "Linear Algebra & Matrix Operations",
      "Calculus & Vector Calculus",
      "Differential Equations & Laplace Transforms",
      "Complex Analysis & Residue Theorem",
      "Probability, Random Variables & Numerical Methods"
    ],
    sampleQuestions: [
      {
        id: "ee-math-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "NAT",
        topic: "Linear Algebra",
        question: "For a 3x3 real matrix A, the eigenvalues are 1, 2, and 3. The determinant of the matrix (A^2 + 3A + 2I) is _______.",
        options: [],
        correctAnswer: "240",
        explanation: "Eigenvalues of (A^2 + 3A + 2I) are:\nλ1 = 1^2 + 3(1) + 2 = 6\nλ2 = 2^2 + 3(2) + 2 = 12\nλ3 = 3^2 + 3(3) + 2 = 20\nDeterminant = 6 * 12 * 20 = 1440 / 6 = 1440 or 6*12*20 = 1440.",
      }
    ]
  },
  {
    id: "electric-circuits",
    slug: "electric-circuits",
    code: "EC",
    title: "Electric Circuits",
    shortName: "Electric Circuits",
    chaptersCount: 5,
    weightage: "8 – 11 Marks",
    weightageNum: 9.5,
    questionCount: 180,
    years: "2018 – 2024",
    difficulty: "Fundamental & Scoring",
    iconName: "Zap",
    accentColor: "#ef4444",
    bgLight: "#fef2f2",
    borderLight: "#fecaca",
    badge: "Core Subject",
    description: "Network graph, KCL, KVL, Node/Mesh analysis, Network theorems, Transient response, Sinusoidal steady-state analysis, Resonance, Two-port networks.",
    topics: [
      "Circuit Analysis & Network Theorems (Thevenin, Norton, Superposition)",
      "Transient Response (RL, RC, RLC Circuits)",
      "Sinusoidal Steady State & AC Power Calculations",
      "Resonance (Series & Parallel RLC)",
      "Two-Port Networks & Three-Phase Balanced/Unbalanced Circuits"
    ],
    sampleQuestions: [
      {
        id: "ee-circuits-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "MCQ",
        topic: "Network Theorems",
        question: "In a linear active resistive network, the maximum power transferred to a load resistance RL from a source with Thevenin resistance Rth occurs when:",
        options: [
          "A) RL = Rth",
          "B) RL = 2 Rth",
          "C) RL = Rth / 2",
          "D) RL = 0"
        ],
        correctAnswer: "A",
        explanation: "By the Maximum Power Transfer Theorem, for maximum power delivered to a purely resistive load from a DC source, RL must equal Rth.",
      }
    ]
  },
  {
    id: "electromagnetic-fields",
    slug: "electromagnetic-fields",
    code: "EMF",
    title: "Electromagnetic Fields",
    shortName: "EM Fields",
    chaptersCount: 5,
    weightage: "4 – 6 Marks",
    weightageNum: 5,
    questionCount: 110,
    years: "2018 – 2024",
    difficulty: "Analytical & Theoretical",
    iconName: "Compass",
    accentColor: "#8b5cf6",
    bgLight: "#f5f3ff",
    borderLight: "#ddd6fe",
    badge: "High Yield",
    description: "Coulomb's Law, Electric Field Intensity, Gauss's Law, Divergence, Capacitance, Biot-Savart Law, Ampere's Law, Faraday's Law, Maxwell's equations.",
    topics: [
      "Electrostatics & Gauss's Law",
      "Magnetostatics & Ampere's Circuital Law",
      "Faraday's Law of Induction & Inductance",
      "Maxwell's Equations & Boundary Conditions",
      "Poynting Vector & Electromagnetic Wave Propagation"
    ],
    sampleQuestions: [
      {
        id: "ee-emf-1",
        year: 2023,
        paper: "GATE EE 2023",
        marks: 1,
        type: "MCQ",
        topic: "Maxwell's Equations",
        question: "Which Maxwell equation expresses the non-existence of isolated magnetic monopoles?",
        options: [
          "A) ∇ · D = ρv",
          "B) ∇ · B = 0",
          "C) ∇ × E = -∂B/∂t",
          "D) ∇ × H = J + ∂D/∂t"
        ],
        correctAnswer: "B",
        explanation: "∇ · B = 0 states that the magnetic flux through any closed surface is zero, proving that magnetic monopoles do not exist.",
      }
    ]
  },
  {
    id: "signals-and-systems",
    slug: "signals-and-systems",
    code: "SS",
    title: "Signals and Systems",
    shortName: "Signals & Systems",
    chaptersCount: 5,
    weightage: "7 – 9 Marks",
    weightageNum: 8,
    questionCount: 155,
    years: "2018 – 2024",
    difficulty: "Mathematical & Transform Heavy",
    iconName: "Activity",
    accentColor: "#06b6d4",
    bgLight: "#ecfeff",
    borderLight: "#a5f3fc",
    badge: "Core Subject",
    description: "Representation of continuous and discrete-time signals, LTI systems, Fourier series, Fourier transform, Laplace transform, z-transform.",
    topics: [
      "Continuous & Discrete-Time Signals Classification",
      "LTI Systems, Convolution & Impulse Response",
      "Continuous & Discrete Fourier Series / Transform",
      "Laplace Transform & ROC Properties",
      "Z-Transform & Digital Filter Realization"
    ],
    sampleQuestions: [
      {
        id: "ee-ss-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "NAT",
        topic: "LTI Systems",
        question: "A causal LTI system has impulse response h(t) = e^(-2t) u(t). The system is excited with input x(t) = u(t). The steady-state output y(∞) is _______.",
        options: [],
        correctAnswer: "0.5",
        explanation: "H(s) = 1/(s + 2). Y(s) = H(s) * X(s) = 1/(s(s+2)). By Final Value Theorem, y(∞) = lim(s->0) s * Y(s) = lim(s->0) 1/(s+2) = 1/2 = 0.5.",
      }
    ]
  },
  {
    id: "electrical-machines",
    slug: "electrical-machines",
    code: "EMACH",
    title: "Electrical Machines",
    shortName: "Electrical Machines",
    chaptersCount: 5,
    weightage: "10 – 12 Marks",
    weightageNum: 11,
    questionCount: 190,
    years: "2018 – 2024",
    difficulty: "High Weightage & Core",
    iconName: "Cpu",
    accentColor: "#10b981",
    bgLight: "#ecfdf5",
    borderLight: "#a7f3d0",
    badge: "Core Heavyweight",
    description: "Single-phase and three-phase transformers, DC machines (generators and motors), Three-phase induction motors, Synchronous machines.",
    topics: [
      "Single-Phase & Three-Phase Transformers",
      "DC Machines: Armature Reaction, Commutation & Speed Control",
      "Three-Phase Induction Motors: Torque-Slip Characteristics & Starting",
      "Synchronous Generators & Motors: Regulation, Phasor Diagrams & V-Curves",
      "Fractional Horsepower & Special Electrical Machines"
    ],
    sampleQuestions: [
      {
        id: "ee-emach-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "MCQ",
        topic: "Transformers",
        question: "In a 100 kVA, 11000/400 V single-phase transformer, the maximum efficiency occurs at 80% of full load. The ratio of core loss (Pi) to full-load copper loss (Pcu_fl) is:",
        options: [
          "A) 0.64",
          "B) 0.80",
          "C) 1.25",
          "D) 0.40"
        ],
        correctAnswer: "A",
        explanation: "At maximum efficiency, Pi = x^2 * Pcu_fl where x = 0.8. Thus Pi / Pcu_fl = (0.8)^2 = 0.64.",
      }
    ]
  },
  {
    id: "power-systems",
    slug: "power-systems",
    code: "PS",
    title: "Power Systems",
    shortName: "Power Systems",
    chaptersCount: 5,
    weightage: "10 – 13 Marks",
    weightageNum: 11.5,
    questionCount: 205,
    years: "2018 – 2024",
    difficulty: "Core Heavyweight",
    iconName: "Radio",
    accentColor: "#3b82f6",
    bgLight: "#eff6ff",
    borderLight: "#bfdbfe",
    badge: "Core Heavyweight",
    description: "Power generation, transmission line modeling, power flow studies, symmetrical & unsymmetrical faults, stability, protection, and economic dispatch.",
    topics: [
      "Transmission Line Modeling, ABCD Parameters & Ferranti Effect",
      "Load Flow Analysis (Gauss-Seidel, Newton-Raphson, Fast Decoupled)",
      "Symmetrical & Unsymmetrical Fault Analysis",
      "Power System Stability (Swing Equation, Equal Area Criterion)",
      "Protection Relays, Circuit Breakers & Economic Load Dispatch"
    ],
    sampleQuestions: [
      {
        id: "ee-ps-1",
        year: 2023,
        paper: "GATE EE 2023",
        marks: 2,
        type: "NAT",
        topic: "Power System Stability",
        question: "A synchronous generator is delivering 0.6 pu power to an infinite bus. The maximum power transfer capability is 1.2 pu. The initial rotor angle delta0 in degrees is _______.",
        options: [],
        correctAnswer: "30",
        explanation: "P = Pmax * sin(delta) => 0.6 = 1.2 * sin(delta) => sin(delta) = 0.5 => delta = 30°.",
      }
    ]
  },
  {
    id: "control-systems",
    slug: "control-systems",
    code: "CSYS",
    title: "Control Systems",
    shortName: "Control Systems",
    chaptersCount: 5,
    weightage: "8 – 10 Marks",
    weightageNum: 9,
    questionCount: 165,
    years: "2018 – 2024",
    difficulty: "High Scoring",
    iconName: "Sliders",
    accentColor: "#6366f1",
    bgLight: "#eef2ff",
    borderLight: "#c7d2fe",
    badge: "High Scoring",
    description: "Block diagram reduction, Mason's gain formula, time-domain analysis, Routh-Hurwitz stability, Root Locus, Bode plot, Nyquist criterion, State-space models.",
    topics: [
      "Transfer Functions & Signal Flow Graphs",
      "Time Domain Response & Error Coefficients",
      "Routh-Hurwitz Stability Criterion & Root Locus Techniques",
      "Frequency Response (Bode Plots, Polar & Nyquist Plots)",
      "State Space Variable Analysis & Controllability/Observability"
    ],
    sampleQuestions: [
      {
        id: "ee-ctrl-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "MCQ",
        topic: "Root Locus",
        question: "The open-loop transfer function of a unity feedback system is G(s) = K / [s(s + 2)(s + 4)]. The asymptotes of the root locus meet the real axis at sigma_a equal to:",
        options: [
          "A) -2",
          "B) -3",
          "C) -1.5",
          "D) -6"
        ],
        correctAnswer: "A",
        explanation: "Centroid sigma_a = (Sum of poles - Sum of zeros) / (P - Z) = (0 - 2 - 4 - 0) / (3 - 0) = -6 / 3 = -2.",
      }
    ]
  },
  {
    id: "electrical-electronic-measurements",
    slug: "electrical-electronic-measurements",
    code: "EEM",
    title: "Electrical and Electronic Measurements",
    shortName: "Measurements",
    chaptersCount: 5,
    weightage: "4 – 6 Marks",
    weightageNum: 5,
    questionCount: 120,
    years: "2018 – 2024",
    difficulty: "Formula Based & Compact",
    iconName: "Gauge",
    accentColor: "#d97706",
    bgLight: "#fffbeb",
    borderLight: "#fde68a",
    badge: "High Accuracy",
    description: "Bridges and Potentiometers, PMMC, MI, Dynamometer instruments, Wattmeters and Energy meters, Instrument transformers, Digital voltmeters, Oscilloscopes.",
    topics: [
      "Measurement of R, L, C using AC/DC Bridges",
      "PMMC, Moving Iron & Electrodynamometer Instruments",
      "Wattmeters, 2-Wattmeter Method & Induction Type Energy Meters",
      "Current & Potential Instrument Transformers (CT & PT)",
      "Digital Multimeters, DVMs, CRO & DSO Waveform Analysis"
    ],
    sampleQuestions: [
      {
        id: "ee-meas-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "NAT",
        topic: "Wattmeter Measurement",
        question: "In a 3-phase balanced system, the power is measured by two wattmeters. One wattmeter reads 4 kW and the other reads 2 kW. What is the power factor of the load (round to 2 decimal places)?",
        options: [],
        correctAnswer: "0.87",
        explanation: "tan(phi) = sqrt(3) * (W1 - W2) / (W1 + W2) = sqrt(3) * (4 - 2) / (4 + 2) = 2*sqrt(3)/6 = 1/sqrt(3) => phi = 30° => power factor cos(30°) = 0.866 ~ 0.87.",
      }
    ]
  },
  {
    id: "analog-and-digital-electronics",
    slug: "analog-and-digital-electronics",
    code: "ADE",
    title: "Analog and Digital Electronics",
    shortName: "Analog & Digital",
    chaptersCount: 5,
    weightage: "7 – 9 Marks",
    weightageNum: 8,
    questionCount: 160,
    years: "2018 – 2024",
    difficulty: "Core & Scoring",
    iconName: "CircuitBoard",
    accentColor: "#14b8a6",
    bgLight: "#f0fdfa",
    borderLight: "#99f6e4",
    badge: "Core Subject",
    description: "Diode circuits, BJT and MOSFET amplifiers, Op-Amp applications, Active filters, Combinational & sequential logic circuits, ADC & DAC converters.",
    topics: [
      "Diode Circuits (Clippers, Clampers, Rectifiers & Zener Regulators)",
      "BJT & MOSFET Small Signal Amplifiers & Biasing",
      "Operational Amplifiers (Inverting, Non-inverting, Integrators, Schmitt Triggers)",
      "Boolean Algebra, K-Maps, Combinational Circuits & Flip-Flops",
      "Counters, Shift Registers, ADC & DAC Conversions"
    ],
    sampleQuestions: [
      {
        id: "ee-ade-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "MCQ",
        topic: "Op-Amps",
        question: "In an ideal inverting amplifier with input resistor R1 = 10 kΩ and feedback resistor Rf = 100 kΩ, what is the closed-loop voltage gain?",
        options: [
          "A) -10",
          "B) +10",
          "C) -11",
          "D) +11"
        ],
        correctAnswer: "A",
        explanation: "For an ideal inverting amplifier, Gain Av = -Rf / R1 = -100k / 10k = -10.",
      }
    ]
  },
  {
    id: "power-electronics",
    slug: "power-electronics",
    code: "PE",
    title: "Power Electronics",
    shortName: "Power Electronics",
    chaptersCount: 5,
    weightage: "8 – 11 Marks",
    weightageNum: 9.5,
    questionCount: 175,
    years: "2018 – 2024",
    difficulty: "Analytical & Design Heavy",
    iconName: "Cpu",
    accentColor: "#ec4899",
    bgLight: "#fdf2f8",
    borderLight: "#fbcfe8",
    badge: "Core Heavyweight",
    description: "Power semiconductor devices (SCR, MOSFET, IGBT), Phase-controlled rectifiers, DC-DC buck/boost converters, Inverters, AC voltage controllers.",
    topics: [
      "Power Semiconductor Switches (SCR, Triac, MOSFET, IGBT)",
      "Single-Phase & 3-Phase Phase Controlled Rectifiers",
      "DC-DC Switch-Mode Converters (Buck, Boost, Buck-Boost)",
      "Voltage Source Inverters (120° & 180° Conduction, PWM Techniques)",
      "AC Voltage Controllers & Harmonic Reduction"
    ],
    sampleQuestions: [
      {
        id: "ee-pe-1",
        year: 2024,
        paper: "GATE EE 2024",
        marks: 2,
        type: "NAT",
        topic: "Buck Converter",
        question: "A step-down DC-DC buck converter operates in continuous conduction mode with an input voltage of 48 V and a duty ratio of 0.35. The average output voltage (in Volts) is _______.",
        options: [],
        correctAnswer: "16.8",
        explanation: "For a Buck converter in CCM: Vout = D * Vin = 0.35 * 48 = 16.8 V.",
      }
    ]
  }
];
