import { SharedNameAndDescription } from "discord.js";

export class AresBaseApplicationCommandData extends SharedNameAndDescription {
  public isDisabled = true;

  public setDisabled(disabled: boolean) {
    this.isDisabled = disabled;
    return this;
  }
}
