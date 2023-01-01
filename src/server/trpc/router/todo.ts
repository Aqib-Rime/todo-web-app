import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import crypto from "crypto";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const todoRouter = router({
  getTodoList: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const dummy: Todo[] = [];
      dummy.push({
        text: "Get 100 done",
        done: false,
        id: crypto.randomBytes(20).toString("hex"),
      });
      dummy.push({
        text: "Brush teeth",
        done: true,
        id: crypto.randomBytes(20).toString("hex"),
      });
      return {
        todos: dummy,
      };
    }),
});
