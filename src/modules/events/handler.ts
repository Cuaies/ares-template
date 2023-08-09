import { ClientEvents } from "discord.js";

export default class AresEventHandler<
  E extends keyof ClientEvents = keyof ClientEvents
> {
  /**
   * The name of the handler.
   */
  readonly name: E;

  /**
   * Wether the handler will execute once or not.
   */
  readonly once: boolean;

  /**
   * Wether to run in production or not.
   */
  readonly production: boolean;

  /**
   * The function to execute when the event is triggered.
   */
  readonly execute: (...args: ClientEvents[E]) => Promise<void> | void;

  constructor(
    name: E,
    isOnce: boolean,
    isProductionReady: boolean,
    execute: (...args: ClientEvents[E]) => Promise<void> | void
  ) {
    this.name = name;
    this.once = isOnce;
    this.production = isProductionReady;
    this.execute = execute;
  }
}
