import { useRef } from "react";
import { api } from "@/utils/api";
import type { Category } from "@prisma/client";

export const useCategoryActions = () => {
  const utils = api.useContext();
  const mutationCounterRef = useRef(0);
  //Queries
  const list = api.category.list.useQuery();

  // Mutations
  update = api.category.update.useMutation({
    onMutate: (variables) => {
      // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
      void utils.category.list.cancel();
      const previousQueryData = utils.category.list.getData();

      const newCategory: Category = {
        id: crypto.randomUUID(),
        name: variables.name,
        slug: variables.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      utils.category.list.setData(undefined, (oldQueryData) => {
        if (oldQueryData) {
          const filteredData =
            oldQueryData.filter((item) => item.slug !== variables.slug) ?? [];
          const elementIndex =
            oldQueryData.findIndex((item) => item.slug === variables.slug) ??
            -1;

          filteredData.splice(elementIndex, 0, newCategory);

          return filteredData;
        }
      });

      // Increment the mutation counter
      mutationCounterRef.current++;

      // return will pass the function or the value to the onError third argument:
      return async () => {
        // Decrement the mutation counter
        mutationCounterRef.current--;
        // Only invalidate queries if there are no ongoing mutations
        if (mutationCounterRef.current === 0) {
          utils.category.list.setData(undefined, previousQueryData);
          await utils.category.list.invalidate();
        }
      };
    },
    onError: async (error, variables, rollback) => {
      //   If there is an errror, then we will rollback
      if (rollback) {
        await rollback();
        console.log("rollback");
      }
    },
    onSuccess: async (data, variables, context) => {
      await utils.category.list.cancel();
    },
    onSettled: async (data, variables, context) => {
      // Decrement the mutation counter
      mutationCounterRef.current--;
      // Only invalidate queries if there are no ongoing mutations
      if (mutationCounterRef.current === 0) {
        await utils.category.list.invalidate();
      }
    },
  });

  return {
    list,
    update,
  };
};
