class HierarchyApp extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "faction-hierarchy",
      title: "Faction Hierarchy",
      template: "templates/hierarchy.hbs",
      width: 800,
      height: 600,
      resizable: true
    });
  }

  getData() {
    return {
      organizations: game.actors.filter(a => a.type === "npc")
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    const container = html.find(".hierarchy-grid")[0];
    new Sortable(container, {
      group: "factions",
      animation: 150,
      onEnd: this._onDrop.bind(this)
    });
  }

  _onDrop(event) {
    console.log("Item dropped:", event);
  }
}