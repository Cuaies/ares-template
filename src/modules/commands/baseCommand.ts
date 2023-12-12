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
  public isDisabled = true;

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
  public setDisabled(state: boolean) {
    this.isDisabled = state;
    return this;
  }
}
