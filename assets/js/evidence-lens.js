(() => {
  document.querySelectorAll("[data-evidence-lens]").forEach((lens) => {
    const stageButtons = [...lens.querySelectorAll("[data-lens-stage]")];
    const panels = [...lens.querySelectorAll("[data-lens-panel]")];
    const segments = [...lens.querySelectorAll("[data-segment]")];

    if (!stageButtons.length || !panels.length) return;
    lens.classList.add("is-enhanced");

    const showStage = (index, moveFocus = false) => {
      const button = stageButtons[index];
      const focusIds = (button.dataset.focus || "").split(",").filter(Boolean);
      const progress = stageButtons.length > 1 ? (index / (stageButtons.length - 1)) * 100 : 0;

      lens.style.setProperty("--stage-progress", `${progress}%`);

      stageButtons.forEach((candidate, candidateIndex) => {
        const selected = candidateIndex === index;
        candidate.setAttribute("aria-pressed", String(selected));
        candidate.classList.toggle("is-active", selected);
      });

      panels.forEach((panel, panelIndex) => {
        const selected = panelIndex === index;
        panel.classList.toggle("is-active", selected);
        panel.hidden = !selected;
      });

      segments.forEach((segment) => {
        segment.classList.toggle("is-active", focusIds.includes(segment.dataset.segment));
      });

      if (moveFocus) button.focus();
    };

    stageButtons.forEach((button, index) => {
      button.addEventListener("click", () => showStage(index));
      button.addEventListener("pointerenter", () => showStage(index));
      button.addEventListener("focus", () => showStage(index));
      button.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % stageButtons.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + stageButtons.length) % stageButtons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = stageButtons.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        showStage(nextIndex, true);
      });
    });

    showStage(0);

    const prediction = lens.querySelector("[data-prediction]");
    if (!prediction) return;

    const options = [...prediction.querySelectorAll("[data-prediction-option]")];
    const reveal = prediction.querySelector("[data-prediction-reveal]");

    options.forEach((option) => {
      option.setAttribute("aria-pressed", "false");
      option.addEventListener("click", () => {
        options.forEach((candidate) => {
          const chosen = candidate === option;
          candidate.classList.toggle("is-chosen", chosen);
          candidate.setAttribute("aria-pressed", String(chosen));
        });
        reveal.hidden = false;
        prediction.classList.add("is-revealed");
      });
    });
  });
})();
