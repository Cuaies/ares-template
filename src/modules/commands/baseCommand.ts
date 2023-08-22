import { ApplicationCommandType, SharedNameAndDescription } from "discord.js";
import { CommandCategories } from "../../ts/enums";

export abstract class AresBaseCommandData extends SharedNameAndDescription {
  /**
   * Application command type.
   */
  abstract readonly type: ApplicationCommandType;

  /**
   * Category of the handler.
   */
  public category!: CommandCategories;

  /**
   * Whether to run in production or not.
   */
  public production = false;

  /**
   * Sets the category of the handler.
   */
  public setCategory(category: CommandCategories) {
    this.category = category;
    return this;
  }

  /**
   * Sets the disabled status of the handler.
   */
  public setProduction(state: boolean) {
    this.production = state;
    return this;
  }
}
