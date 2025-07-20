class OrganizationSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["factionforge", "sheet", "actor"],
      template: "templates/organization-sheet.hbs",
      width: 600,
      height: 500,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  getData() {
    const data = super.getData();
    return {
      ...data,
      system: data.actor.system,
      allies: data.actor.system.allies || [],
      enemies: data.actor.system.enemies || []
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".add-ally").click(this._onAddAlly.bind(this));
    html.find(".add-enemy").click(this._onAddEnemy.bind(this));
  }

  async _onAddAlly(event) {
    event.preventDefault();
    const name = prompt("Enter ally name:");
    if (name) {
      const updated = this.actor.system.allies || [];
      updated.push(name);
      await this.actor.update({ "system.allies": updated });
    }
  }

  async _onAddEnemy(event) {
    event.preventDefault();
    const name = prompt("Enter enemy name:");
    if (name) {
      const updated = this.actor.system.enemies || [];
      updated.push(name);
      await this.actor.update({ "system.enemies": updated });
    }
  }
}