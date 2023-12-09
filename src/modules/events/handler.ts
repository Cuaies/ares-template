import { Awaitable, ClientEvents } from "discord.js";

export default class AresEventHandler<
  Event extends keyof ClientEvents = keyof ClientEvents
> {
  constructor(
    /**
     * Represents the handler's identifier.
     */
    public readonly name: Event,
    /**
     * Represents wether the handler will execute once or not.
     */
    public readonly isOnce: boolean,
    /**
     * Represents whether the handler is meant to be run in production.
     */
    public readonly isDisabled: boolean,
    /**
     * Represents the function to execute when the event is triggered.
     */
    public readonly execute: (...args: ClientEvents[Event]) => Awaitable<void>
  ) {}
}
