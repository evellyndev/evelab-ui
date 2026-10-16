# Evelab Design Guidelines

## 1. Product Vision and Design Philosophy

Evelab is a computational experimentation laboratory: a place to change an input, observe a system, form a hypothesis, and run the next experiment. It begins with AI-oriented explorations but must remain credible for algorithms, data structures, concurrency, and distributed systems. Its visual language must therefore describe **computation and inquiry**, not artificial intelligence.

The experience should feel like a precisely built scientific instrument: dark, quiet, capable, and immediately legible. The memorable element is always the live model, diagram, graph, trace, or output—not decorative interface chrome. Futurism comes from spatial clarity, responsive feedback, and carefully controlled light.

**Required:** Treat every screen as an experiment workspace. Make the current model or result the visual center of gravity.

**Required:** Dark mode is the canonical Evelab experience. A future light mode, if added, must be a separately designed system rather than a mechanical inversion.

**Recommended:** Use calm, explanatory language that helps users investigate: “Adjust temperature”, “Compare runs”, “Inspect token path”. Do not use anthropomorphic or hype-driven AI language.

## 2. Design Principles

1. **Observe before decorating.** Reserve visual prominence for computational output, state changes, and controls that change them.
2. **Precision creates the future.** Alignment, measured spacing, stable geometry, and meaningful data encodings communicate sophistication better than neon effects.
3. **One clear next action.** At any point, users should understand what can be adjusted, what has changed, and how to proceed.
4. **Progressive disclosure preserves focus.** Show essential parameters and results first; put advanced settings, raw data, and methodology behind purposeful disclosure.
5. **State is visible.** Running, paused, selected, invalid, stale, and compared states must be understandable without relying on motion or color alone.
6. **Explain through interaction.** Immediate local feedback is preferable to instructional copy. A control should reveal its effect in the visualization whenever possible.
7. **Restraint protects signal.** Glow, color, borders, and animation are finite attention resources. Use them to establish hierarchy or communicate change.

## 3. Visual Identity

### Character

Evelab combines an atmospheric charcoal field with disciplined violet illumination. Surfaces read as layered instrument panels rather than floating SaaS cards. Edges are subtle; divisions come primarily from spacing, tonal elevation, and a limited number of functional rules.

**Required:** Keep large background areas visually quiet. Use violet light as a locator for active computation, selection, and primary action—not as a persistent ambient decoration.

**Required:** Use sentence case for interface labels, actions, and headings. Avoid all-caps labels unless preserving a literal technical acronym.

**Required:** Do not use generic dashboard card grids as the default page structure. Panels must correspond to an experiment’s actual roles: input, controls, visualization, inspector, comparison, or evidence.

**Recommended:** Use a small, controlled corner-radius scale: compact controls may be softly rounded; large workspace regions should feel architectural and stable. Avoid giving every element the same radius.

### Signature composition

On an experiment screen, establish a **quiet control rail and an expansive observation field**. The observation field may contain a graph, canvas, trace, text transformation, or state-space diagram. Its scale should make it clear that the interface exists to inspect computation.

## 4. Color System and Semantic Design Tokens

### Brand anchors

These source colors are fixed and must not be replaced:

| Name | Value | Primary role |
|---|---:|---|
| Charcoal | `#191622` | Main background |
| Violet | `#6C4CF1` | Brand and primary action |
| Lavender | `#A78BFA` | Secondary emphasis and selection support |
| Coral | `#FF6B6B` | Error, warning accent, exceptional data |
| Yellow | `#FFD166` | Active/running state and important information |
| Off-white | `#F7F5FF` | Primary text |

Derived tones may be created only to support contrast, layering, and interaction. They must remain perceptually related to the EvellynDev palette: charcoal-derived surfaces, violet-derived emphasis, and restrained neutral text. Do not introduce unrelated blue, cyan, green, or pink accent families as brand colors.

### Semantic token naming

Use role-based names in product decisions; never make UI decisions directly from a brand color name. The following names are the naming contract, not implementation code.

| Token family | Example names | Purpose |
|---|---|---|
| Canvas | `color.canvas.base`, `color.canvas.sunken` | Page and recessed visualization backgrounds |
| Surface | `color.surface.default`, `color.surface.raised`, `color.surface.overlay` | Workspace panes, popovers, dialogs |
| Content | `color.content.primary`, `color.content.secondary`, `color.content.muted`, `color.content.inverse` | Text and icons by hierarchy |
| Border | `color.border.subtle`, `color.border.strong`, `color.border.focus` | Separation, input boundaries, keyboard focus |
| Action | `color.action.primary`, `color.action.primary-hover`, `color.action.primary-pressed`, `color.action.secondary` | Interactive controls |
| Status | `color.status.running`, `color.status.warning`, `color.status.error`, `color.status.success` | System and experiment states |
| Data | `color.data.series-1`, `color.data.series-2`, `color.data.selected`, `color.data.reference` | Encoded visualization values |
| Effects | `color.effect.violet-glow`, `color.effect.focus-ring` | Controlled light and focus treatment |

**Required:** Map `color.canvas.base` to Charcoal and `color.content.primary` to Off-white in the canonical dark theme. Map primary action to Violet, warning/exception to Coral, and active/running emphasis to Yellow only when semantics support it.

**Required:** Do not assign data-series colors only by brand importance. Each series requires a stable meaning, distinguishable lightness/value, and a non-color fallback such as label, pattern, line style, marker, or position.

**Required:** A focus indicator must use a dedicated high-contrast ring or outline; a subtle change of surface tone alone is insufficient.

**Recommended:** Use Lavender for selected context, secondary annotations, and low-intensity secondary affordances. It should support Violet rather than compete with it.

### Color usage rules

- Use Violet for one primary action per local context, active navigation, selected entities, and deliberate computation emphasis.
- Use Yellow to communicate a state that deserves attention but is not a failure: running, paused-with-attention, important parameter, or key observation.
- Use Coral sparingly for destructive actions, validation problems, anomalous values, and alert-worthy deviations. It must never be the default decorative accent.
- Use glow as a localized consequence of focus, selection, or activity. Keep it low-opacity, short-range, and absent from passive UI.

The palette’s limited warmth and violet range makes the laboratory feel authored and calm; semantic discipline prevents the dark UI from becoming an undifferentiated purple field.

## 5. Typography

Typography should be modern, technical, and human-readable—not a generic “developer tool” caricature. Specify a contemporary grotesk or humanist sans family for interface, explanatory prose, and display roles. A tabular-number feature or compatible companion face may be used for measurements, timestamps, and parameter values. Do not make monospace the default small-label face.

**Required:** Establish a type ramp with a small number of intentional steps: display, page title, section title, body, supporting text, control label, and numeric/data readout.

**Required:** Use tabular figures for changing numeric values, aligned tables, axes, and comparison metrics. Keep labels in the primary interface typeface unless code syntax itself is being shown.

**Required:** Keep ordinary reading lines below 80 characters. Favor 45–70 characters in explanatory panels.

**Recommended:** Use a restrained display treatment with medium or semibold weight and slightly tightened tracking for experiment titles. Body copy should use regular weight with comfortable leading. Use weight and size before color to establish hierarchy.

Avoid italic or colored fragments merely to manufacture emphasis. Technical strings should be formatted distinctly only when they aid parsing: parameter values, code, token IDs, mathematical notation, and timestamps.

## 6. Spacing, Layout, and Grid System

### Spatial system

Use a 4-unit base spacing system. Typical intervals should be multiples of 4; use 8, 12, 16, 24, 32, 48, and 64 to establish clear jumps in relationship. Dense parameter controls may use 8–12-unit internal spacing; workspace regions need 24–48 units of separation.

**Required:** Express closeness through spacing before adding a border. Use borders to indicate interaction boundaries, resizable regions, or data plots—not to box every group.

**Required:** Align pane edges, headings, controls, and visualization frames to a shared grid. Visualizations may extend beyond text measures, but their controls and annotations must still align to the workspace grid.

### Grid

Use a fluid central container with deliberate outer margins. On wide screens, use a 12-column grid with a stable gap scale; on medium layouts, use 8 columns; on compact layouts, use 4 columns. Avoid centering a dense experiment workspace by default—left-align its informational structure while allowing the visualization to occupy the available field.

```text
Wide experiment workspace
┌────────── control / context ──────────┬──────── observation field ────────┐
│ title · description · parameters      │ live visualization / result        │
│ presets · run controls                │ legend · axes · selected detail    │
└───────────────────────────────────────┴───────────────────────────────────┘
```

The asymmetric layout is intentional: it gives parameter changes a stable origin and grants results enough room to reveal structure.

## 7. Component Design Principles

Components are instruments, not ornamental containers. Design their anatomy around a user’s task and the experiment’s state.

**Required:** Every interactive component must define default, hover, focus-visible, pressed, disabled, loading, invalid (where relevant), and selected/active (where relevant) states before implementation.

**Required:** Buttons must state the outcome with an active verb: “Run experiment”, “Reset parameters”, “Save snapshot”. Keep the same term across action, progress message, and completion feedback.

**Required:** Controls that affect a live result must expose current value, unit/range when meaningful, and any commit behavior (instant, on release, or on Run).

**Required:** Avoid icon-only controls unless the action is universally recognizable and an accessible name is supplied. Destructive controls require clear text or explicit confirmation when consequences are material.

**Recommended:** Group settings by the computational concept they modify, not by HTML input type. Pair sliders with precise numeric entry when precision is important. Offer presets as reproducible starting states, never as unexplained aesthetic choices.

Panels should have a clear hierarchy: workspace frame, pane title/context, content, then optional local actions. Elevation is for overlays and temporary focus, not a default shadow under every pane.

## 8. Interaction States

| State | Required visual and behavioral signal |
|---|---|
| Default | Clear label/value, calm surface, no unnecessary glow |
| Hover | Reveal interactivity with a modest surface, border, or icon change; do not shift layout |
| Focus-visible | High-contrast dedicated ring/outline with sufficient offset from the component |
| Pressed | Momentary depth or tonal response that confirms input |
| Selected | Persistent Violet/Lavender-associated signal plus shape, label, or structural cue |
| Running | Yellow-associated status plus explicit text and progress/activity representation |
| Loading | Preserve layout, identify what is loading, and prevent duplicate action safely |
| Disabled | Lower emphasis with an understandable reason when the action may appear unexpectedly unavailable |
| Invalid / error | Coral-associated message near the affected control, clear recovery instruction, and non-color indicator |
| Stale result | Mark output as based on previous parameters and offer “Run” or automatic-refresh status |

**Required:** Never communicate a state only through color, hover, animation, or tooltip.

**Required:** If a parameter change does not update the result immediately, mark the result stale. This avoids a common and dangerous experiment-interface ambiguity.

## 9. Motion Design and Microinteractions

Motion should make causal relationships visible: an updated node, a changed distribution, a committed control value, or a newly available result. It must not simulate sci-fi atmosphere.

**Required:** Honor reduced-motion preferences. In reduced mode, preserve state changes with immediate transitions and static indicators.

**Required:** Motion must not block reading, obscure values, or delay routine input. Keep transitions short and purposeful; data update timing must be truthful.

**Recommended:** Use a single coherent motion vocabulary: brief opacity/tonal transitions for panes, focused interpolation for data changes, and small confirmation feedback for committed actions. Animate from the changed source toward the affected output when that relationship is understandable.

Avoid perpetual ambient animation, scanning lines, floating particles, exaggerated parallax, and sequential reveal animations on every section. A localized violet glow may ease in around a selected node or active control, then settle.

## 10. Visualization Guidelines

Visualizations are first-class interface content. They must answer a question, expose a model, or support a comparison; they are not decorative backgrounds.

**Required:** Give each visualization a descriptive title, a short statement of what is being shown, and a direct mapping from marks to meaning (legend, labels, axes, or in-context annotation).

**Required:** Preserve stable axes, scale, node positions, and series assignments across comparable runs whenever possible. When a visualization deliberately changes its frame of reference, announce it.

**Required:** Make selection inspectable. Selecting a token, node, interval, or point must produce a persistent detail state that keyboard and touch users can reach.

**Required:** Provide a textual or tabular alternative for essential results, including values encoded by color or position.

**Recommended:** Use subdued gridlines and axis treatments so data marks lead. Let one strong encoding carry the primary comparison; use secondary encodings only when they add independent information.

### Graphs, paths, and time-based views

- Prefer direct labels for small numbers of series; use a legend when direct labels would clutter the view.
- Use Violet as the primary selected or focal path, Lavender for related context, Yellow for active execution, and Coral for exceptions. Do not make every node luminous.
- In network diagrams, encode structure through position and connection first. Use color as a supporting signal and provide a minimap or navigation aid only when spatial scale makes it necessary.
- In animated simulations, allow pause, step, reset, speed control, and a readable current-state indicator whenever temporal change is part of the lesson.
- For text and token visualizations, maintain reading order, provide an accessible linear representation, and make token boundaries unambiguous.

## 11. Accessibility

**Required:** Meet WCAG 2.2 AA contrast expectations for text and meaningful controls. Validate derived surface and text tones; do not assume that a palette relationship is accessible.

**Required:** Support complete keyboard operation, logical focus order, visible focus, semantic names, and status announcements for run completion, errors, and meaningful asynchronous updates.

**Required:** Ensure touch targets are comfortably usable and keep pointer-only interactions optional. Drag interactions need keyboard alternatives or explicit controls that achieve the same outcome.

**Required:** Do not rely on hue alone in charts, system status, or selection. Pair it with label, icon, pattern, marker, line style, or positional change.

**Recommended:** Write concise alternatives that explain the conclusion and the relationship in a visualization, rather than trying to narrate every pixel. Preserve user-entered parameter values and focus during updates where possible.

## 12. Responsive Design

Responsive behavior should preserve the experiment’s reasoning flow, not merely shrink the desktop composition.

**Required:** On compact screens, keep the current result visible or readily returnable while adjusting controls. Do not force users to remember a distant output after each input change.

**Required:** Reorder by task priority: experiment context, key result, essential controls, then advanced settings and supporting evidence. Do not hide required data behind hover-dependent UI.

**Recommended:** Convert a persistent control rail into a clearly labeled collapsible or bottom-accessible parameter region on narrow screens. Preserve a fixed-height or aspect-ratio-aware visualization viewport where spatial reading matters; offer zoom/pan/reset controls where needed.

Avoid squeezing dense charts until labels collide. Prefer purposeful simplification, alternate tabular views, or a comparison selector.

## 13. Experiment Layout Patterns

### A. Guided single experiment

Use for focused learning tools such as a Token Visualizer.

```text
Context and purpose
├── Input / parameters
└── Primary visualization
    └── Explanation, selected detail, and evidence
```

The visualization follows quickly after the editable input so cause and effect remain obvious.

### B. Control rail + observation field

Use for exploratory tools where users iterate repeatedly.

```text
Parameters and presets | Live model / graph / simulation
Run and reset          | Detail inspector / legend / trace
```

Keep the rail stable. The observation field owns the majority of width and visual emphasis.

### C. Compare runs

Use when parameters or methods need side-by-side evaluation.

```text
Shared context
├── Run A: parameters + result
└── Run B: parameters + result
    └── Difference view / conclusion
```

**Required:** Fix scales, units, and series meanings between comparable views. Clearly identify which run is the reference.

### D. Inspect a system trace

Use for concurrency, distributed systems, or multi-step model behavior.

```text
Timeline / sequence field
├── selected event detail
├── related entities and causal links
└── filters and playback controls
```

Make time, causality, and current selection explicit. Never make users infer the active event from color alone.

## 14. Design Anti-patterns

The following are prohibited unless a future product requirement provides a specific functional reason:

- Cyberpunk decoration: neon frames, dense glow, scanlines, holographic ornaments, or arbitrary “terminal” texture.
- Gradients used as visual filler, especially large violet washes behind ordinary content.
- A uniform grid of interchangeable rounded cards that obscures task hierarchy.
- Persistent motion with no causal or instructional meaning.
- Color-only distinctions for status, data series, or selection.
- Default dashboard metrics presented before the experiment or visualization they are meant to explain.
- Oversized empty hero areas that delay access to an interactive tool.
- Hidden precision: sliders without values, charts without scales, status without explanation, or results whose parameter provenance is unclear.
- Overly dense control surfaces that make a computational concept feel harder than it is.
- AI-specific motifs—brains, sparkles, robot imagery, generated-looking mesh art—as a stand-in for the identity of a general computational laboratory.

## Governance Checklist

Before a future implementation is accepted, verify:

- The primary visualization is the largest or most prominent functional region.
- All colors serve a semantic role and preserve the EvellynDev anchors.
- Every interactive state, including stale output and keyboard focus, is specified.
- The interface communicates cause and effect between parameters and results.
- Motion and glow are localized, restrained, and meaningful.
- The layout remains understandable on compact screens and without color or animation.
- No framework, component library, or implementation technology is implied by these guidelines.

These guidelines are the design authority for Evelab. When a future pattern conflicts with them, preserve the product vision—quiet scientific precision in service of computational discovery—unless a documented user need requires an explicit exception.
