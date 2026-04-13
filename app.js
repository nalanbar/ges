const nodes = {
  gameName: document.querySelector("#game-name"),
  bggId: document.querySelector("#bgg-id"),
  baseFields: document.querySelector("#base-fields"),
  penaltyFields: document.querySelector("#penalty-fields"),
  stewardshipFields: document.querySelector("#stewardship-fields"),
  verifiedFields: document.querySelector("#verified-fields"),
  scoreGameLabel: document.querySelector("#score-game-label"),
  finalScore: document.querySelector("#final-score"),
  impactTier: document.querySelector("#impact-tier"),
  baseSubtotal: document.querySelector("#base-subtotal"),
  penaltyTotal: document.querySelector("#penalty-total"),
  disclosureTotal: document.querySelector("#disclosure-total"),
  actionsTotal: document.querySelector("#actions-total"),
  stewardshipTotal: document.querySelector("#stewardship-total"),
  tierBand: document.querySelector("#tier-band"),
  guidanceTitle: document.querySelector("#guidance-title"),
  guidanceDescription: document.querySelector("#guidance-description"),
  consumerGuidance: document.querySelector("#consumer-guidance"),
  publisherGuidance: document.querySelector("#publisher-guidance"),
  penaltyCapNote: document.querySelector("#penalty-cap-note"),
  actionsCapNote: document.querySelector("#actions-cap-note"),
  actionsGateNote: document.querySelector("#actions-gate-note"),
  scoreExplanation: document.querySelector("#score-explanation"),
  bggExport: document.querySelector("#bgg-export"),
  copyBgg: document.querySelector("#copy-bgg"),
};

function makeField({ label, input, note }) {
  const wrapper = document.createElement("label");
  wrapper.className = "field";

  const title = document.createElement("span");
  title.textContent = label;
  wrapper.append(title, input);

  if (note) {
    const help = document.createElement("small");
    help.textContent = note;
    wrapper.append(help);
  }

  return wrapper;
}

function makeSelect({ options, id, placeholder }) {
  const select = document.createElement("select");
  select.id = id;
  select.name = id;

  if (placeholder) {
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = placeholder;
    placeholderOption.selected = true;
    select.append(placeholderOption);
  }

  options.forEach((option, index) => {
    const element = document.createElement("option");
    element.value = String(option.points);
    element.textContent = `${formatPoints(option.points)} — ${option.label}`;
    if (!placeholder && index === 0) {
      element.selected = true;
    }
    select.append(element);
  });

  select.addEventListener("change", updateScore);
  return select;
}

function makeBinarySelect({ id, yesLabel, points }) {
  const select = document.createElement("select");
  select.id = id;
  select.name = id;

  [
    { points: 0, label: "No" },
    { points, label: `Yes — ${yesLabel}` },
  ].forEach((option) => {
    const element = document.createElement("option");
    element.value = String(option.points);
    element.textContent = option.points === 0 ? option.label : `${formatPoints(option.points)} — ${option.label}`;
    select.append(element);
  });

  select.addEventListener("change", updateScore);
  return select;
}

function makeWeightControls() {
  const group = document.createElement("div");
  group.className = "weight-input-group";

  const input = document.createElement("input");
  input.id = rubric.weight.id;
  input.name = rubric.weight.id;
  input.type = "number";
  input.min = "0";
  input.step = "0.01";
  input.placeholder = "Enter weight";
  input.addEventListener("input", updateScore);

  const unit = document.createElement("select");
  unit.id = "weightUnit";
  unit.name = "weightUnit";
  rubric.weight.units.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    unit.append(option);
  });
  unit.addEventListener("change", updateScore);

  group.append(input, unit);
  return group;
}

function formatPoints(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function readNumber(id) {
  const value = document.getElementById(id).value;
  return value === "" ? 0 : Number(value);
}

function getWeightInGrams() {
  const raw = document.getElementById(rubric.weight.id).value;
  if (raw === "") {
    return null;
  }

  const numeric = Number(raw);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return null;
  }

  const unit = document.getElementById("weightUnit").value;
  switch (unit) {
    case "kg":
      return numeric * 1000;
    case "oz":
      return numeric * 28.349523125;
    case "lb":
      return numeric * 453.59237;
    default:
      return numeric;
  }
}

function getWeightScore(weightGrams) {
  if (weightGrams === null) {
    return 0;
  }

  return rubric.weight.brackets.find((bracket) => weightGrams >= bracket.min && weightGrams < bracket.max);
}

function formatWeight(weightGrams) {
  if (weightGrams === null) {
    return "weight not entered";
  }

  if (weightGrams >= 1000) {
    return `${(weightGrams / 1000).toFixed(1).replace(/\.0$/, "")} kg`;
  }

  return `${Math.round(weightGrams)}g`;
}

function summarizeCategory(criterion, points) {
  switch (criterion.id) {
    case "materialMix":
      if (points >= 10) return "highly recyclable materials";
      if (points >= 7) return "mostly recyclable materials";
      if (points >= 4) return "limited recyclability due to mixed laminated components";
      if (points >= 2) return "hard-to-recycle composite materials";
      return "largely non-recyclable mixed materials";
    case "packagingPlastic":
      if (points >= 5) return "plastic-free packaging";
      if (points >= 3) return "minimal packaging plastic";
      if (points >= 1) return "standard single-use plastic packaging";
      return "heavy disposable plastic packaging";
    case "packagingEfficiency":
      if (points >= 10) return "tight packaging efficiency";
      if (points >= 8) return "efficient packaging";
      if (points >= 5) return "moderate wasted box space";
      if (points >= 2) return "oversized packaging";
      return "extremely oversized packaging";
    case "durability":
      if (points >= 10) return "very durable components";
      if (points >= 8) return "strong component longevity";
      if (points >= 5) return "moderate wear risk";
      if (points >= 2) return "short component lifespan";
      return "fragile or quasi-disposable components";
    case "expectedUse":
      if (points >= 10) return "very high expected play intensity";
      if (points >= 8) return "strong expected long-term use";
      if (points >= 5) return "moderate expected use";
      if (points >= 2) return "limited expected use";
      return "minimal replay value";
    case "supplyChain":
      if (points >= 7) return "local manufacturing";
      if (points >= 5) return "regional manufacturing";
      if (points >= 2) return "overseas manufacturing";
      return "undisclosed manufacturing location";
    default:
      return criterion.label.toLowerCase();
  }
}

function renderForm() {
  nodes.baseFields.append(
    makeField({
      label: `${rubric.weight.label} (/${rubric.weight.max})`,
      input: makeWeightControls(),
      note: rubric.weight.help,
    })
  );

  rubric.baseCriteria.forEach((criterion) => {
    nodes.baseFields.append(
      makeField({
        label: `${criterion.label} (/${criterion.max})`,
        input: makeSelect({
          id: criterion.id,
          options: criterion.options,
          placeholder: "Select a rubric option",
        }),
      })
    );
  });

  nodes.stewardshipFields.append(
    makeField({
      label: `${rubric.disclosure.label}`,
      input: makeSelect({
        id: rubric.disclosure.id,
        options: rubric.disclosure.options,
      }),
    })
  );

  rubric.penalties.forEach((penalty) => {
    nodes.penaltyFields.append(
      makeField({
        label: penalty.label,
        input: makeBinarySelect({
          id: penalty.id,
          yesLabel: penalty.label,
          points: penalty.points,
        }),
      })
    );
  });

  rubric.verifiedActions.forEach((action) => {
    if (action.options) {
      nodes.verifiedFields.append(
        makeField({
          label: action.label,
          input: makeSelect({ id: action.id, options: action.options }),
        })
      );
      return;
    }

    nodes.verifiedFields.append(
      makeField({
        label: action.label,
        input: makeBinarySelect({
          id: action.id,
          yesLabel: action.label,
          points: action.points,
        }),
      })
    );
  });

  nodes.gameName.addEventListener("input", updateScore);
  nodes.bggId.addEventListener("input", updateScore);
}

function getTier(score) {
  return rubric.tiers.find((tier) => score >= tier.min);
}

function getLargestPenalty() {
  const applied = rubric.penalties
    .map((penalty) => ({ ...penalty, applied: readNumber(penalty.id) }))
    .filter((penalty) => penalty.applied < 0);

  if (applied.length === 0) {
    return null;
  }

  return applied.reduce((largest, current) => (current.points < largest.points ? current : largest));
}

function getLargestPositiveModifier(disclosure, verifiedActionsTotal) {
  const candidates = [];

  if (disclosure > 0) {
    candidates.push({
      points: disclosure,
      sentence: "Publisher disclosure provides a meaningful positive modifier.",
    });
  }

  const actionValues = rubric.verifiedActions.map((action) => {
    if (action.id === "offsetProgram") {
      return {
        label: action.label,
        points: readNumber(action.id),
      };
    }

    return {
      label: action.label,
      points: readNumber(action.id),
    };
  });

  const positiveAction = actionValues.reduce((largest, current) => {
    if (!largest || current.points > largest.points) {
      return current;
    }
    return largest;
  }, null);

  if (positiveAction && positiveAction.points > 0 && verifiedActionsTotal > 0) {
    candidates.push({
      points: positiveAction.points,
      sentence: `${positiveAction.label} provides a modest additional offset.`,
    });
  }

  if (candidates.length === 0) {
    return null;
  }

  return candidates.reduce((largest, current) => (current.points > largest.points ? current : largest));
}

function buildGapSummary(weightScore, weightGrams) {
  const scoredCategories = [
    {
      label: "total weight",
      max: rubric.weight.max,
      score: weightScore.points,
      summary:
        weightGrams === null
          ? "missing total weight"
          : weightScore.points >= 24
            ? `low total weight (${formatWeight(weightGrams)})`
            : weightScore.points >= 12
              ? `moderate total weight (${formatWeight(weightGrams)})`
              : `high total weight (${formatWeight(weightGrams)})`,
    },
    ...rubric.baseCriteria.map((criterion) => {
      const selectedPoints = readNumber(criterion.id);
      return {
        label: criterion.label,
        max: criterion.max,
        score: selectedPoints,
        summary: summarizeCategory(criterion, selectedPoints),
      };
    }),
  ];

  return scoredCategories.reduce((largestGap, current) => {
    const currentGap = current.max - current.score;
    if (!largestGap || currentGap > largestGap.gap) {
      return { ...current, gap: currentGap };
    }
    return largestGap;
  }, null);
}

function buildExplanation({ tier, weightScore, weightGrams, disclosure, verifiedActionsTotal }) {
  const primaryGap = buildGapSummary(weightScore, weightGrams);
  const sentences = [`${tier.label} — primarily driven by ${primaryGap.summary}.`];

  const largestPenalty = getLargestPenalty();
  if (largestPenalty) {
    sentences.push(`${largestPenalty.label} reduces the score further.`);
  }

  if (disclosure < rubric.verifiedActionsGate) {
    sentences.push("No verified sustainability actions due to lack of publisher disclosure.");
    return sentences.join(" ");
  }

  const positiveModifier = getLargestPositiveModifier(disclosure, verifiedActionsTotal);
  if (positiveModifier) {
    sentences.push(positiveModifier.sentence);
  }

  return sentences.join(" ");
}

function getAppliedPenalties() {
  return rubric.penalties.filter((penalty) => readNumber(penalty.id) < 0);
}

function getVerifiedActionsSummary(disclosure) {
  if (disclosure < rubric.verifiedActionsGate) {
    return {
      lines: ["No verified sustainability actions due to disclosure below +2."],
    };
  }

  const lines = [];
  let raw = 0;

  rubric.verifiedActions.forEach((action) => {
    const value = readNumber(action.id);
    if (value <= 0) {
      return;
    }

    raw += value;
    lines.push(`${action.label}: ${formatPoints(value)}`);
  });

  if (lines.length === 0) {
    lines.push("No verified sustainability actions applied.");
  }

  return { lines };
}

function buildThingTag(gameName, bggId) {
  if (!bggId) {
    return gameName || "Untitled game";
  }

  return gameName ? `[thing=${bggId}]${gameName}[/thing]` : `[thing=${bggId}][/thing]`;
}

function buildBggExport({
  gameName,
  bggId,
  finalScore,
  tier,
  baseSubtotal,
  penaltyTotal,
  penaltyRaw,
  disclosure,
  verifiedActionsTotal,
  actionsRaw,
  stewardshipTotal,
  weightScore,
  weightGrams,
  explanation,
}) {
  const title = buildThingTag(gameName, bggId);
  const penalties = getAppliedPenalties();
  const verifiedSummary = getVerifiedActionsSummary(disclosure);

  const baseLines = [
    `[*]Total Game Weight: ${weightScore.points}/${rubric.weight.max} (${formatWeight(weightGrams)})`,
    ...rubric.baseCriteria.map((criterion) => `[*]${criterion.label}: ${readNumber(criterion.id)}/${criterion.max}`),
  ];

  const penaltyLines =
    penalties.length > 0
      ? penalties.map((penalty) => `[*]${penalty.label}: ${penalty.points}`)
      : ["[*]None"];

  const stewardshipLines = [
    `[*]Disclosure / Transparency: ${formatPoints(disclosure)}`,
    ...verifiedSummary.lines.map((line) => `[*]${line}`),
    `[*]Verified actions total: ${formatPoints(verifiedActionsTotal)}`,
  ];

  const notes = [
    `[b]Explanation[/b]`,
    explanation,
  ];

  if (penaltyRaw < rubric.penaltyCap) {
    notes.push(`Penalty cap applied: raw penalties ${penaltyRaw}, capped to ${rubric.penaltyCap}.`);
  }

  if (actionsRaw > rubric.verifiedActionsCap) {
    notes.push(`Verified actions cap applied: raw verified actions +${actionsRaw}, capped to +${rubric.verifiedActionsCap}.`);
  }

  return [
    `[b]Tabletop Eco Score[/b]`,
    ``,
    `Game: ${title}`,
    `Final Score: [b]${finalScore}[/b]`,
    `Impact Tier: [b]${tier.label}[/b] (${tier.band})`,
    ``,
    `[b]Base Product Score[/b]`,
    `[list]`,
    ...baseLines,
    `[*]Base subtotal: ${baseSubtotal}/82`,
    `[/list]`,
    ``,
    `[b]Penalties[/b]`,
    `[list]`,
    ...penaltyLines,
    `[*]Penalty total: ${penaltyTotal}`,
    `[/list]`,
    ``,
    `[b]Stewardship[/b]`,
    `[list]`,
    ...stewardshipLines,
    `[*]Stewardship subtotal: ${formatPoints(stewardshipTotal)}`,
    `[/list]`,
    ``,
    ...notes,
  ].join("\n");
}

function updateScore() {
  const weightGrams = getWeightInGrams();
  const weightScore = getWeightScore(weightGrams) || { points: 0, label: "No weight entered" };

  const baseSubtotal =
    weightScore.points +
    rubric.baseCriteria.reduce((sum, criterion) => sum + readNumber(criterion.id), 0);

  const penaltyRaw = rubric.penalties.reduce((sum, penalty) => sum + readNumber(penalty.id), 0);
  const penaltyTotal = Math.max(penaltyRaw, rubric.penaltyCap);

  const disclosure = readNumber(rubric.disclosure.id);
  const verifiedAllowed = disclosure >= rubric.verifiedActionsGate;

  if (!verifiedAllowed) {
    rubric.verifiedActions.forEach((action) => {
      document.getElementById(action.id).value = "0";
    });
  }

  const actionsRaw = verifiedAllowed
    ? rubric.verifiedActions.reduce((sum, action) => sum + readNumber(action.id), 0)
    : 0;
  const verifiedActionsTotal = Math.min(actionsRaw, rubric.verifiedActionsCap);

  const stewardshipTotal = disclosure + verifiedActionsTotal;
  const finalScore = baseSubtotal + penaltyTotal + disclosure + verifiedActionsTotal;
  const tier = getTier(finalScore);
  const gameName = nodes.gameName.value.trim() || "Current game";
  const bggId = nodes.bggId.value.trim();
  const explanation = buildExplanation({
    tier,
    weightScore,
    weightGrams,
    disclosure,
    verifiedActionsTotal,
  });

  nodes.scoreGameLabel.textContent = gameName;
  nodes.finalScore.textContent = `${finalScore}`;
  nodes.baseSubtotal.textContent = `${baseSubtotal}`;
  nodes.penaltyTotal.textContent = `${penaltyTotal}`;
  nodes.disclosureTotal.textContent = `${disclosure}`;
  nodes.actionsTotal.textContent = `${verifiedActionsTotal}`;
  nodes.stewardshipTotal.textContent = `${stewardshipTotal}`;
  nodes.tierBand.textContent = tier.band;

  nodes.impactTier.textContent = tier.label;
  nodes.impactTier.className = `tier-pill ${tier.id}`;
  nodes.guidanceTitle.textContent = tier.label;
  nodes.guidanceDescription.textContent = tier.description;
  nodes.consumerGuidance.textContent = tier.consumer;
  nodes.publisherGuidance.textContent = tier.publisher;
  nodes.scoreExplanation.textContent = explanation;

  nodes.penaltyCapNote.textContent =
    penaltyRaw < rubric.penaltyCap
      ? `Penalties capped at ${rubric.penaltyCap}. Raw total was ${penaltyRaw}.`
      : `Penalties capped at ${rubric.penaltyCap}.`;

  nodes.actionsCapNote.textContent =
    actionsRaw > rubric.verifiedActionsCap
      ? `Verified actions capped at +${rubric.verifiedActionsCap}. Raw total was +${actionsRaw}.`
      : `Verified actions capped at +${rubric.verifiedActionsCap}.`;

  nodes.actionsGateNote.textContent = verifiedAllowed
    ? ""
    : "Verified actions require a disclosure score of at least +2. Publishers must show their work before earning extra credit.";

  nodes.bggExport.value = buildBggExport({
    gameName,
    bggId,
    finalScore,
    tier,
    baseSubtotal,
    penaltyTotal,
    penaltyRaw,
    disclosure,
    verifiedActionsTotal,
    actionsRaw,
    stewardshipTotal,
    weightScore,
    weightGrams,
    explanation,
  });
}

async function copyBggExport() {
  const text = nodes.bggExport.value;
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    nodes.copyBgg.textContent = "Copied";
  } catch {
    nodes.bggExport.focus();
    nodes.bggExport.select();
    nodes.copyBgg.textContent = "Select text to copy";
  }

  window.setTimeout(() => {
    nodes.copyBgg.textContent = "Copy BGG Export";
  }, 1600);
}

renderForm();
updateScore();
nodes.copyBgg.addEventListener("click", copyBggExport);
