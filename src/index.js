import "./styles.css";

const initTabs = (containerElement) => {
  const tabs = [...containerElement.querySelectorAll('[role="tab"]')];
  const firstTab = tabs.find(
    (tab) => tab.getAttribute("aria-selected") === "true"
  );
  const panels = [...containerElement.querySelectorAll('[role="tabpanel"]')];

  const getIndexOfTab = (tabElement) => {
    return tabs.indexOf(tabElement);
  };

  let currentTabIndex = getIndexOfTab(firstTab);

  const onClickTab = (event) => {
    const index = getIndexOfTab(event.currentTarget);
    if (currentTabIndex > -1) {
      tabs[currentTabIndex].setAttribute("aria-selected", "false");
      tabs[currentTabIndex].setAttribute("tabindex", "-1");
      panels[currentTabIndex].setAttribute("aria-hidden", "true");
    }

    tabs[index].setAttribute("aria-selected", "true");
    tabs[index].removeAttribute("tabindex");
    panels[index].setAttribute("aria-hidden", "false");

    currentTabIndex = index;
  };

  let focusedTabIndex = -1;

  const onFocusTab = (event) => {
    const index = getIndexOfTab(event.currentTarget);
    focusedTabIndex = index;

    console.log(focusedTabIndex);
  };

  const tabsLastIndex = tabs.length - 1;

  const onKeydownTab = (event) => {
    const key = event.key;
    switch (key) {
      case "ArrowRight":
      case "Right":
        focusNextTab();
        break;
      case "ArrowLeft":
      case "Left":
        focusPreviousTab();
        break;
      case "Home":
        focusTab(0);
        break;
      case "End":
        focusTab(tabsLastIndex);
        break;
    }
  };

  const focusTab = (index) => {
    tabs[index].focus();
  };

  const focusNextTab = () => {
    const nextIndex =
      focusedTabIndex + 1 > tabsLastIndex ? 0 : focusedTabIndex + 1;

    focusTab(nextIndex);
  };

  const focusPreviousTab = () => {
    const previousIndex =
      focusedTabIndex - 1 < 0 ? tabsLastIndex : focusedTabIndex - 1;

    focusTab(previousIndex);
  };

  tabs.forEach((tab) => tab.addEventListener("click", onClickTab, false));
  tabs.forEach((tab) => tab.addEventListener("focus", onFocusTab, false));
  tabs.forEach((tab) => tab.addEventListener("keydown", onKeydownTab, false));
};

[...document.querySelectorAll(".tabs")].forEach((x) => initTabs(x));
