import type { ExtendedClient } from "@src/types/index.ts";

export interface Event {
    id: string;
    once: boolean;
    execute(client: ExtendedClient, ...arg: unknown[]): void;
}
