Hooks.once("init", async function () {
  console.log("FactionForge | Initializing...");

  CONFIG.Actor.documentClass = class extends CONFIG.Actor.documentClass {
    prepareBaseData() {
      super.prepareBaseData();
      if (this.type === "organization") {
        this.system.reputation = this.system.reputation || 0;
      }
    }
  };

  Actors.registerSheet("factionforge", OrganizationSheet, {
    types: ["npc"],
    makeDefault: false
  });
});

Hooks.once("ready", async function () {
  console.log("FactionForge | Ready");
  game.factionforge = {
    showHierarchy: () => {
      const app = new HierarchyApp();
      app.render(true);
    }
  };
});

Hooks.on("getSceneControlButtons", (controls) => {
  controls.push({
    name: "factionforge",
    title: "Faction Hierarchy",
    icon: "fas fa-network-wired",
    layer: null,
    tools: [{
      name: "showHierarchy",
      title: "Show Hierarchy",
      icon: "fas fa-sitemap",
      onClick: () => game.factionforge.showHierarchy(),
      button: true
    }]
  });
});