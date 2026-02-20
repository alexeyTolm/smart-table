export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      const select = elements[elementName];
      if (select) {
        select.append(
          ...Object.values(indexes[elementName]).map((name) => {
            const el = document.createElement("option");
            el.textContent = name;
            el.value = name;
            return el;
          }),
        );
      }
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action && action.name === "clear") {
      const fieldContainer = action.parentElement;
      const input =
        fieldContainer.querySelector("input") ||
        fieldContainer.querySelector("select");
      if (input) {
        input.value = "";
        state[action.dataset.field] = "";
      }
    }

    const filter = {};

    Object.keys(elements).forEach((key) => {
      const el = elements[key];
      if (el && el.value) {
        filter[`filter[${el.name}]`] = el.value;
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
