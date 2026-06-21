GreenPulse: Low-Carbon Behavioral Companion & Habit Tracker
=======================================================

1. CHOSEN VERTICAL
------------------
Vertical: Climate Action, FinTech Integration & Behavioral Sustainability
Subsegment: Privacy-First Carbon Companion with Interactive Feed Simulation

GreenPulse is a modern, shame-free household carbon tracker designed using behavioral science. Instead of relying on manual retroactive spreadsheets or invasive permanent bank connections, it delivers one realistic daily habit change nudge with clear financial, wellness, and time co-benefits. It additionally integrates a mock local metadata sandbox showing how financial/smart-phone transaction logs can be evaluated completely on-device without data leaks.


2. APPROACH AND LOGIC
---------------------
Traditional carbon calculators introduce "eco-anxiety" and administrative fatigue, leading to massive user abandonment rates (typically within a week). GreenPulse uses several design patterns to shift the climate action paradigm:

* Single Action Focus (Nudges): Rather than loading endless lists, we propose a singular Daily Nudge customized to lifestyle categories, helping users bypass choice overload and decision fatigue.
* Co-Benefit Alignment: Every green initiative is bound to a concrete personal payoff:
  - Health (vascular vitality, plant-based diets, stress relief)
  - Money (cash saved on utility cycles, subscription reductions)
  - Time (reclaimed hours from aviation bypass or active walking)
* Persona-Based Frictionless Hydration: The system implements an interactive Login Page featuring three distinct personas:
  - Jane Cooper (Urban Executive | High-flying baseline)
  - Carlos Ruiz (Family Steward | Suburban heating & SUV focus)
  - Anya Volkova (Eco Student | Vegan/Transit efficient)
  Choosing a persona instantly hydrates the responsive dashboard tracking system with mature historical data and metrics to display the app's capability immediately.


3. HOW THE SOLUTION WORKS
-------------------------
The application features a fully cohesive responsive flow:

* Animated Entry Profile Gate (LoginPage.tsx):
  - Provides instant-hydration profiles with pre-filled baseline breakdowns and active logs for quick sandbox experimentation.
  - Generates beautiful entrance animations, security validations, and a clean local cookie-free architecture.
* Baseline Lifecycle Quiz (OnboardingQuiz.tsx):
  - Establishes a five-point estimated household rating on transport, diet, residential utilities, shopping intensity, and aviation schedules to find the yearly carbon range.
* Real-time Interactive Recharts (ProgressUI.tsx):
  - Runway Benchmarks: A vertical bar comparison comparing estimated baseline, current run-rates based on checked habits, and the UN Paris Climate targets (2.0 t/yr).
  - Source Allocation: An interactive doughnut pie chart displaying proportional lifestyle carbon sources.
  - Cumulative Prevented Timeline: A flowing area gradient mapping accumulated carbon savings dynamically.
* Daily Nudge Habit Stacking (NudgeEngine.tsx):
  - Generates daily eco-tasks that can be marked "committed." Checked items insert dynamic log rows that increment cumulative metrics and save co-benefit tallies.
* Simulated Smartphone Metadata Sandbox (PassiveSignalSimulator.tsx):
  - Simulates a mobile device's on-device scanning layer. Demonstrates how descriptors from maps, apps, and billing can trigger passive sustainability metrics privately.
* Responsive Twin-Layer Theme Switcher:
  - Establishes a comfortable, screen-friendly Light Mode by default for a friendly, approachable aesthetic experience.
  - Controls an interactive dark mode toggle from the User Profile & Settings tab, syncing preferences automatically to browser LocalStorage.
  - Applies classes dynamically across both HTML document nodes and the application's root wrapping container to ensure flawless styling compatibility inside preview iframe sandboxes.


4. ASSUMPTIONS MADE
-------------------
* Local Sandbox Model: We assume maximum user satisfaction is reached when zero credentials, credit cards, or external OAuth protocols are forced. All states and calculations run locally in the browser sandbox.
* EPA and IPCC Standard Coefficients: Lifestyle selections are mapped to simplified, robust annual carbon metrics sourced from official EPA and Intergovernmental Panel on Climate Change (IPCC) datasets.
* Paris Climate Benchmark: The target-runway baseline for sustainable individual impact is set at 2.0 tonnes of CO2e per year, in alignment with standard COP/Paris Climate pathways.
