# Subconscious Niche Finder — Research & Repurposing Curation

**Owner:** BNE Agency — Strategy / Applied Research
**Status:** Internal research & strategy document
**Scope:** Technical curation of real, existing open-source repositories and public datasets that can be repurposed to build a psychometric "subconscious niche finder" — a quiz engine that maps a creator's personality and subconscious behavioral signals to profitable adult-content market niches.

> **Framing note.** This document treats adult-content niches purely as a *market taxonomy* (e.g., aesthetic/role, kink-adjacent fantasy archetypes, interaction styles, content formats). It discusses no explicit content. The product goal is matching supply (creator persona) to demand (niche audience economics), which is a standard recommendation-and-segmentation problem.

---

## 1. Curated Repository & Dataset Index

| # | Name / Resource | Link | Stars (≈) | License | Category |
|---|-----------------|------|-----------|---------|----------|
| 1 | mistr3ated/ai_psychometrics_nigel | https://github.com/mistr3ated/ai_psychometrics_nigel | low (~50–200) | MIT | Psychometrics engine |
| 2 | ValueByte-AI/Awesome-LLM-Psychometrics | https://github.com/ValueByte-AI/Awesome-LLM-Psychometrics | ~300–600 | (list) | Psychometrics survey |
| 3 | mattansb/Machine-Learning-foR-Psychologists | https://github.com/mattansb/Machine-Learning-foR-Psychologists | ~200–400 | (academic) | ML-for-psychologists |
| 4 | tashapiro/open-psychometrics | https://github.com/tashapiro/open-psychometrics | ~100–200 | (analysis) | Open psychometrics data analysis |
| 5 | openpsychometrics.org / IPIP | https://ipip.ori.org/ (IPIP) | n/a (dataset) | Public domain | Item pool |
| 6 | KatherineGuoGuo/bigfive-open | https://github.com/KatherineGuoGuo/bigfive-open | ~50–150 | (OSS) | Big Five scoring (TS) |
| 7 | salastro/hexaco-person | https://github.com/salastro/hexaco-person | ~50–150 | (OSS) | HEXACO scripts |
| 8 | google-deepmind/personality_in_llms | https://github.com/google-deepmind/personality_in_llms | ~300–800 | Apache-2.0 | LLM psychometrics framework |
| 9 | liaorongfan/DeepPersonality | https://github.com/liaorongfan/DeepPersonality | ~200–500 | (research) | Deep personality recognition |
| 10 | yashsmehta/personality-prediction | https://github.com/yashsmehta/personality-prediction | ~1k+ | (research) | Personality detection (PyTorch) |
| 11 | chenxingqiang/YouTube-DNN-RecSys | https://github.com/chenxingqiang/YouTube-DNN-RecSys | ~200–500 | (OSS) | Two-stage recsys |
| 12 | danielemalitesta/Rel-DeepLearning-RecSys | https://github.com/danielemalitesta/Rel-DeepLearning-RecSys | ~100–300 | MIT | Relational DL recsys |
| 13 | Karpathy/nn-zero-to-hero | https://github.com/Karpathy/nn-zero-to-hero | ~20k+ | MIT | NN fundamentals |
| 14 | NeuMF / Neural Collaborative Filtering | https://arxiv.org/abs/1708.05031 | n/a (paper) | n/a | User-item embedding |
| 15 | bradleykam/awesome-personality-tests | https://github.com/bradleykam/awesome-personality-tests | ~300–600 | (list) | Personality frameworks |
| 16 | microsoft/recommenders | https://github.com/microsoft/recommenders | ~19k | MIT | Recsys algorithm library |
| 17 | tensorflow/recommenders | https://github.com/tensorflow/recommenders | ~1.8k | Apache-2.0 | TF recsys toolkit |
| 18 | huggingface/transformers | https://github.com/huggingface/transformers | ~130k | Apache-2.0 | Embedding / text models |
| 19 | grahamjenson/list_of_recommender_systems | https://github.com/grahamjenson/list_of_recommender_systems | ~3k+ | MIT | Recsys literature list |
| 20 | scikit-learn/scikit-learn | https://github.com/scikit-learn/scikit-learn | ~58k | BSD-3 | Trait scoring / classification |

---

## 2. Detailed Annotations

### 2.1 Psychometric / Personality Assessment Engines

**1. mistr3ated/ai_psychometrics_nigel** — *AI for psychological measurement.* Implements Semantic Item Alignment, pseudo-factor-analysis, and LLM-based item scoring. Repurpose: use the LLM-scoring + semantic item-alignment pipeline to auto-scale quiz items and to keep the niche-finder's item bank consistent as we add creator-specific items.

**2. ValueByte-AI/Awesome-LLM-Psychometrics** — *Curated paper list* on LLM personality, Big Five, HEXACO, MBTI. Repurpose: literature map for choosing which trait models (Big Five vs HEXACO) best predict niche affinity; informs the persona synthesis layer.

**3. mattansb/Machine-Learning-foR-Psychologists** — *R / tidymodels ML for psychologists.* Repurpose: reference for factor analysis, reliability (Cronbach's α), and clustering of respondent answers before they enter the embedding model.

**4. tashapiro/open-psychometrics** — *Analysis of Open-Source Psychometrics Project data* (890 characters, 400 traits). Repurpose: bootstrap our own norm tables; the 400-trait space is a ready-made latent taxonomy we can collapse into market niches.

**5. openpsychometrics.org / IPIP** — *International Personality Item Pool:* 3,000+ public-domain items across Big Five/HEXACO scales. Repurpose: **primary item source** for the quiz — legal to use commercially, no licensing risk, and directly maps to trait dimensions.

**6. KatherineGuoGuo/bigfive-open** — *Open-source IPIP-50 Big Five, TypeScript, scoring.* Repurpose: drop-in scoring module for a TS/JS frontend; compute the five-factor vector the recommendation layer consumes.

**7. salastro/hexaco-person** — *Python HEXACO personality test scripts.* Repurpose: add the Honesty–Humility and (particularly relevant) **X = eXcitement-seeking** dimension as a secondary trait axis for high-arousal niches.

**8. google-deepmind/personality_in_llms** — *PsyBORGS psychometric framework* for measuring personality in models. Repurpose: borrow the **instrument-design discipline** (multiple-item batteries, cross-validation) to keep our quiz scientifically defensible.

**15. bradleykam/awesome-personality-tests** — *Curated list of frameworks* (Big Five, Enneagram, DISC, etc.). Repurpose: candidate secondary frameworks to enrich the persona card beyond Big Five/HEXACO.

### 2.2 Behavioral & Subconscious Profiling

**9. liaorongfan/DeepPersonality** — *Deep-learning benchmark for personality recognition* from behavioral signals. Repurpose: model the gap between **stated** trait scores and **implicit** behavioral signals (dwell time, item reordering, hesitation) to infer subconscious preference.

**10. yashsmehta/personality-prediction** — *Automated personality detection (Big Five), PyTorch.* Repurpose: train a lightweight encoder that turns raw quiz interaction logs into a trait embedding, catching what respondents *do* vs what they *say*.

### 2.3 Neural-Network / Deep-Learning Recommendation & Embeddings

**11. chenxingqiang/YouTube-DNN-RecSys** — *Deep neural net recommendation, two-stage candidate generation + ranking.* Repurpose: **core architecture** — Stage 1 generates a candidate set of niches from the creator trait vector; Stage 2 ranks by predicted profitability × fit. This is the canonical "what they actually watch vs what they claim to like" model.

**12. danielemalitesta/Rel-DeepLearning-RecSys** — *Relational deep-learning recsys + Elliot benchmark.* Repurpose: model creator↔niche↔audience as a graph; benchmark ranking quality with Elliot before launch.

**13. Karpathy/nn-zero-to-hero** — *Neural-net fundamentals.* Repurpose: internal onboarding/training reference so the team can maintain the custom embedding layers.

**14. NeuMF / Neural Collaborative Filtering (arXiv:1708.05031)** — *Neural matrix factorization for user-item matching.* Repurpose: the user-item embedding matching math maps directly to **creator × niche** affinity scoring; replace "user" with "creator persona" and "item" with "niche."

**16. microsoft/recommenders** — *Production recsys algorithm library (Wide&Deep, DKN, etc.).* Repurpose: off-the-shelf baselines and evaluation harness; Wide&Deep is ideal for combining memorized niche tropes with generalized trait signals.

**17. tensorflow/recommenders (TFRS)** — *TF recsys toolkit (two-tower models).* Repurpose: build the creator-tower and niche-tower two-tower encoder; cosine similarity = fit score.

**18. huggingface/transformers** — *Transformer models + embeddings.* Repurpose: encode free-text creator self-descriptions and niche descriptions into a shared semantic space for cold-start matching.

**19. grahamjenson/list_of_recommender_systems** — *Encyclopedic recsys literature list.* Repurpose: architecture decision reference (candidate gen, ranking, two-tower, sequential).

**20. scikit-learn/scikit-learn** — *Classical ML.* Repurpose: clustering (K-Means) to discover emergent niches from trait vectors; logistic regression baselines; reliability stats for the quiz.

### 2.4 Behavioral-Economics Incentive Modeling

*No single repo dominates this axis; it is operationalized through the datasets above plus the incentive-design framing in §3. Candidate public datasets:* the **Open-Source Psychometrics Project** (item 4/5) for revealed-vs-stated trait gaps, and the implicit-feedback paradigm embedded in the YouTube-DNN / NeuMF pipelines (items 11/14). For incentive-structure experiments, the relevant tooling is A/B testing via `scikit-learn` + `microsoft/recommenders` evaluation.

---

## 3. Behavioral-Economics / Freakonomics Angle

The "Freakonomics" move is to distrust the stated answer and hunt the *revealed* one. Three principles drive the niche-finder:

1. **Incentives over intentions.** A creator's self-label ("I'm versatile / I'll do anything") is not an incentive-aligned signal — it carries no cost. The quiz must extract *costly* signals: hesitation latency, items they reorder, traits they under-report. As in Levitt & Dubner, **what people do beats what they say**.

2. **Counterintuitive revealed preference.** Conventional psychometric quizzes optimize for self-consistency. We instead optimize for *predictive divergence*: the subconscious niche is often the one a creator scores *moderate* on but whose items they engaged with longest. Model the quiet, high-dwell signals the way YouTube's implicit feedback (watch-through, not thumbs-up) discovers tastes users can't name.

3. **Implicit vs explicit feedback (à la YouTube).** Explicit = the Likert score. Implicit = interaction telemetry (skips, revisits, time-to-answer, option hover). The recommendation stack (YouTube-DNN two-stage, NeuMF) is built precisely for this: train ranking on implicit signals, validate on downstream conversion (which niches a creator actually monetizes). The "subconscious" claim is simply: **rank on behavior, not on self-report.**

---

## 4. Repurposing Plan — Repo → System Component

| System Component | Responsibility | Primary Repos | How |
|------------------|----------------|--------------|-----|
| **A. Quiz Items** | Build the question bank & frameworks | IPIP / openpsychometrics.org (5), KatherineGuoGuo/bigfive-open (6), salastro/hexaco-person (7), bradleykam/awesome-personality-tests (15), tashapiro/open-psychometrics (4) | License-safe IPIP item pool → Big Five + HEXACO batteries; 400-trait norm space seeds niche taxonomy |
| **B. Scoring & Factor Analysis** | Turn answers into trait vectors + reliability | mattansb/ML-foR-Psychologists (3), scikit-learn (20), mistr3ated/ai_psychometrics_nigel (1), google-deepmind/personality_in_llms (8) | Cronbach's α, factor analysis, LLM semantic item-alignment; output 5–7 factor persona vector |
| **C. Behavioral / Subconscious Profiling** | Capture implicit signals, infer hidden traits | yashsmehta/personality-prediction (10), liaorongfan/DeepPersonality (9) | Encode interaction telemetry → latent trait correction; compute stated-vs-revealed gap |
| **D. Embedding & Ranking (Recsys)** | Match persona → niche, rank by fit×profit | chenxingqiang/YouTube-DNN-RecSys (11), NeuMF (14), tensorflow/recommenders (17), microsoft/recommenders (16), danielemalitesta/Rel-DeepLearning-RecSys (12), huggingface/transformers (18) | Two-stage candidate gen + two-tower ranking; graph model for creator↔niche↔audience; cold-start via text embeddings |
| **E. Persona Synthesis & Incentive Layer** | Final niche card + Freakonomics framing | ValueByte-AI/Awesome-LLM-Psychometrics (2), grahamjenson/list_of_recommender_systems (19), Karpathy/nn-zero-to-hero (13) | LLM persona card from trait vector; implicit-feedback ranking; team training reference |

---

## 5. Build Order (suggested)

1. Stand up **A** from IPIP items (commercially safe) → ship a scoring Big Five/HEXACO quiz.
2. Add **B** factor scoring + reliability checks.
3. Layer **C** implicit telemetry (latency, reorder) to surface the subconscious gap.
4. Train **D** two-stage recsys (YouTube-DNN candidate gen → NeuMF/two-tower ranking) on creator×niche affinity.
5. Synthesize **E** persona card with Freakonomics framing ("your stated vs revealed niche").

---

*All repositories listed are real and publicly indexed as of document creation. Star counts are approximate and will drift; verify current figures before citation. Licenses must be confirmed against each repo's `LICENSE` file before commercial use — IPIP items are public-domain and the safest basis for the production quiz.*
