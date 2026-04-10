const rubric = {
  baseCriteria: [
    {
      id: "materialsFunctional",
      label: "1. Materials — Functional Components",
      max: 25,
      options: [
        { points: 25, label: "Almost entirely paper/cardboard, no plastic components" },
        { points: 20, label: "Paper/cardboard plus wood components (meeples, tokens)" },
        { points: 15, label: "Mostly paper/cardboard with some functional plastic (dice, standees, durable pieces)" },
        { points: 10, label: "Mixed materials; noticeable plastic pieces serving gameplay function" },
        { points: 5, label: "Heavily plastic components (miniatures, custom trays integral to play)" },
        { points: 0, label: "Overwhelmingly plastic; miniature-heavy or injection-molded throughout" },
      ],
    },
    {
      id: "materialsPackaging",
      label: "1b. Materials — Non-Functional / Packaging Plastic",
      max: 10,
      options: [
        { points: 10, label: "No plastic insert, no shrink wrap, no plastic bags — paper/cardboard organization only" },
        { points: 7, label: "Minimal plastic: biodegradable bags or one small functional plastic tray" },
        { points: 4, label: "Standard plastic insert or vacuum tray, some plastic bags" },
        { points: 2, label: "Oversized plastic insert, excessive bagging, non-functional plastic" },
        { points: 0, label: "Massive vacuum-form tray, blister packs, heavy disposable plastic throughout" },
      ],
    },
    {
      id: "packagingEfficiency",
      label: "2. Packaging Efficiency",
      max: 15,
      options: [
        { points: 15, label: "Small or modest box, tightly packed, minimal air — box sized to contents" },
        { points: 12, label: "Efficient use of space; box matches contents well" },
        { points: 8, label: "Standard box with moderate wasted space" },
        { points: 4, label: "Oversized box for shelf presence or marketing; significant empty volume" },
        { points: 0, label: "Enormous box mostly transporting air and stretch goal regret" },
      ],
    },
    {
      id: "separability",
      label: "3. Separability / Recyclability",
      max: 15,
      options: [
        { points: 15, label: "Components easily sorted into single-material streams in <5 min; uncoated cardboard, standard card stock" },
        { points: 12, label: "Mostly separable; minor mixed materials (e.g. linen-finish cards, light coatings)" },
        { points: 8, label: "Some hard-to-separate materials; coated cards, foil elements, mixed inserts" },
        { points: 4, label: "Significant mixed materials; laminated boards, metal + plastic fused components" },
        { points: 0, label: "Effectively non-separable; heavily bonded mixed materials throughout" },
      ],
    },
    {
      id: "durability",
      label: "4. Durability / Lifespan",
      max: 15,
      options: [
        { points: 15, label: "Very durable; likely decades of play. Standard-sleeved cards, solid boards, replacement parts available" },
        { points: 12, label: "Strong longevity; good component quality, sleeve-compatible cards" },
        { points: 8, label: "Moderate wear expected; odd card sizes (hard to sleeve), thin cardboard" },
        { points: 4, label: "Components likely to wear, chip, delaminate, or need replacement quickly" },
        { points: 0, label: "Fragile or quasi-disposable; legacy/destructible components" },
      ],
    },
    {
      id: "playValue",
      label: "5. Play Value per Footprint",
      max: 15,
      options: [
        { points: 15, label: "Extremely high replay per unit of material — small footprint, hundreds of plays" },
        { points: 12, label: "Strong replayability or large campaign per footprint (e.g. LCG core, big campaign)" },
        { points: 8, label: "Decent but finite replay; moderate box, moderate variety" },
        { points: 4, label: "Limited replayability relative to physical size" },
        { points: 0, label: "Mostly novelty or one-shot; huge footprint, minimal replay value" },
      ],
    },
    {
      id: "supplyChain",
      label: "6. Supply Chain / Geography",
      max: 5,
      options: [
        { points: 5, label: "Manufactured in same country as primary market" },
        { points: 3, label: "Manufactured on same continent as primary market" },
        { points: 1, label: "Manufactured overseas (industry default — container shipping)" },
        { points: 0, label: "Manufacturing location unknown / undisclosed" },
      ],
    },
  ],
  penalties: [
    { id: "shrinkWrap", points: -5, label: "Excessive shrink wrap / plastic overwrap beyond industry standard" },
    { id: "oversizedInsert", points: -5, label: "Non-functional oversized insert (box filler, not organizer)" },
    { id: "foilFinish", points: -5, label: "Foil, laminate, or hard-to-recycle finish on many components" },
    { id: "miniHeavy", points: -10, label: "Mini-heavy production where cardboard/wood alternatives were plausible" },
    { id: "collectorBloat", points: -5, label: "Obvious collector bloat packaging" },
    { id: "oddCardSizes", points: -3, label: "Non-standard card sizes preventing sleeving" },
  ],
  disclosure: {
    id: "disclosure",
    label: "Disclosure / Transparency",
    options: [
      { points: 10, label: "Detailed public product-specific disclosure: materials, sources, manufacturing locations per game" },
      { points: 7, label: "Company-level sustainability commitments with some product-specific detail" },
      { points: 3, label: "Public statement beyond marketing; real but vague sustainability claims" },
      { points: 0, label: "No meaningful public disclosure" },
      { points: -5, label: "Greenwashed fluff; unverifiable claims, marketing language only" },
      { points: -10, label: "Deceptive claims contradicted by obvious product choices" },
    ],
  },
  verifiedActions: [
    { id: "recycledMaterials", points: 2, label: "Verified recycled or FSC-certified materials" },
    { id: "plasticFreePackaging", points: 2, label: "No shrink wrap / plastic-free packaging initiative" },
    { id: "regionalManufacturing", points: 2, label: "Regional manufacturing strategy (same continent or closer)" },
    { id: "carbonAccounting", points: 2, label: "Carbon accounting or product-level emissions tracking" },
    {
      id: "offsetProgram",
      label: "Credible offset program",
      options: [
        { points: 0, label: "Not applied" },
        { points: 1, label: "+1" },
        { points: 2, label: "+2" },
        { points: 3, label: "+3" },
      ],
      note: "Requires disclosure score of at least +3.",
    },
  ],
  tiers: [
    {
      id: "light",
      label: "LIGHT",
      min: 80,
      band: "80+",
      description: "Low environmental cost, high efficiency.",
      consumer: "No special considerations. Enjoy your efficient hobby.",
      publisher: "Share your practices openly to raise the bar for the industry.",
    },
    {
      id: "modest",
      label: "MODEST",
      min: 60,
      band: "60–79",
      description: "Reasonable footprint with room for mindful ownership.",
      consumer: "Prioritize play over accumulation. Sleeve cards to extend lifespan. Sell or gift games you no longer use.",
      publisher: "Examine non-functional plastic and packaging. Small material changes move the needle at this level.",
    },
    {
      id: "considerable",
      label: "CONSIDERABLE",
      min: 40,
      band: "40–59",
      description: "Meaningful footprint that benefits from committed use.",
      consumer: "Commit to regular play to justify the footprint. Share or lend rather than shelf-sitting. Recycle packaging carefully.",
      publisher: "Evaluate material substitutions. Publish sustainability disclosures if you have not. This tier is where transparency earns the most trust.",
    },
    {
      id: "heavy",
      label: "HEAVY",
      min: -Infinity,
      band: "Below 40",
      description: "Resource-intensive product. Ownership carries real environmental weight.",
      consumer: "This is an environmental investment. Earn it through long-term use, community sharing, or lighter choices elsewhere in your collection.",
      publisher: "Your product is inherently material-intensive, so stewardship matters more, not less. Carbon reporting, recycled materials, and take-back programs are how you earn trust here.",
    },
  ],
};

const nodes = {
  gameName: document.querySelector("#game-name"),
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
    element.value = option.points;
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
    element.value = option.points;
    element.textContent = option.points === 0 ? option.label : `${formatPoints(option.points)} — ${option.label}`;
    select.append(element);
  });

  select.addEventListener("change", updateScore);
  return select;
}

function formatPoints(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function readNumber(id) {
  const value = document.getElementById(id).value;
  return value === "" ? 0 : Number(value);
}

function renderForm() {
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
      label: `${rubric.disclosure.label} (-10 to +10)`,
      input: makeSelect({
        id: rubric.disclosure.id,
        options: rubric.disclosure.options,
        placeholder: "Select a disclosure rating",
      }),
    })
  );

  const silenceDefault = makeBinarySelect({
    id: "silenceDefault",
    yesLabel: "Apply silence default for no disclosure",
    points: -5,
  });
  nodes.stewardshipFields.append(
    makeField({
      label: "Silence default rule",
      input: silenceDefault,
      note: "Use this only when you want to enforce the workbook note: if there is no disclosure, silence costs something.",
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
          note: action.note,
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
}

function getTier(score) {
  return rubric.tiers.find((tier) => score >= tier.min);
}

function updateScore() {
  const baseSubtotal = rubric.baseCriteria.reduce((sum, criterion) => sum + readNumber(criterion.id), 0);
  const penaltyRaw = rubric.penalties.reduce((sum, penalty) => sum + readNumber(penalty.id), 0);
  const penaltyTotal = Math.max(penaltyRaw, -15);

  const disclosure = readNumber(rubric.disclosure.id);
  const silenceDefault = disclosure === 0 ? readNumber("silenceDefault") : 0;

  let offsetProgram = readNumber("offsetProgram");
  if (disclosure < 3 && offsetProgram > 0) {
    offsetProgram = 0;
    document.getElementById("offsetProgram").value = "0";
  }

  const actionsRaw = rubric.verifiedActions
    .filter((action) => action.id !== "offsetProgram")
    .reduce((sum, action) => sum + readNumber(action.id), 0) + offsetProgram;
  const actionsTotal = Math.min(actionsRaw, 5);

  const disclosureTotal = disclosure + silenceDefault;
  const stewardshipTotal = disclosureTotal + actionsTotal;
  const finalScore = baseSubtotal + penaltyTotal + stewardshipTotal;
  const tier = getTier(finalScore);
  const gameName = nodes.gameName.value.trim() || "Current game";

  nodes.scoreGameLabel.textContent = gameName;
  nodes.finalScore.textContent = `${finalScore}`;
  nodes.baseSubtotal.textContent = `${baseSubtotal}`;
  nodes.penaltyTotal.textContent = `${penaltyTotal}`;
  nodes.disclosureTotal.textContent = `${disclosureTotal}`;
  nodes.actionsTotal.textContent = `${actionsTotal}`;
  nodes.stewardshipTotal.textContent = `${stewardshipTotal}`;
  nodes.tierBand.textContent = tier.band;

  nodes.impactTier.textContent = tier.label;
  nodes.impactTier.className = `tier-pill ${tier.id}`;
  nodes.guidanceTitle.textContent = tier.label;
  nodes.guidanceDescription.textContent = tier.description;
  nodes.consumerGuidance.textContent = tier.consumer;
  nodes.publisherGuidance.textContent = tier.publisher;

  nodes.penaltyCapNote.textContent =
    penaltyRaw < -15 ? `Penalties capped at -15. Raw total was ${penaltyRaw}.` : "Penalties capped at -15.";
  nodes.actionsCapNote.textContent =
    actionsRaw > 5 ? `Verified actions capped at +5. Raw total was +${actionsRaw}.` : "Verified actions capped at +5.";
}

renderForm();
updateScore();
