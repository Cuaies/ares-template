import { Awaitable, ClientEvents } from "discord.js";

export default class AresEventHandler<
  E extends keyof ClientEvents = keyof ClientEvents
> {
  /**
   * The name of the handler.
   */
  readonly name: E;

  /**
   * Whether the handler will execute once or not.
   */
  readonly once: boolean;

  /**
   * Whether to run in production or not.
   */
  readonly production: boolean;

  /**
   * The function to execute when the event is triggered.
   */
  readonly execute: (...args: ClientEvents[E]) => Awaitable<void>;

  constructor(
    name: E,
    isOnce: boolean,
    isProductionReady: boolean,
    execute: (...args: ClientEvents[E]) => Awaitable<void>
  ) {
    this.name = name;
    this.once = isOnce;
    this.production = isProductionReady;
    this.execute = execute;
  }
}
