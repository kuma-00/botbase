import type { MessageResponse } from "@src/types/index.ts";
import { reply } from "@src/util/index.ts";

export const messageResponse: MessageResponse = {
    id: "pingResponse",
    filter: (m) =>
        [
            "ping",
            "ピング",
            "ping!",
            "ピング！",
        ].some((i) => m.cleanContent === i),
    async execute(client, message) {
        reply(message, `Pong ! **${client.ws.ping}ms**`);
    },
};
