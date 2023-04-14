import { api } from "@/utils/api";
import type { Category } from "@prisma/client";

export const useCategoryActions = () => {
  const utils = api.useContext();
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

      // return will pass the function or the value to the onError third argument:
      return () => utils.category.list.setData(undefined, previousQueryData);
    },
    onError: (error, variables, rollback) => {
      //   If there is an errror, then we will rollback
      if (rollback) {
        rollback();
        console.log("rollback");
      }
    },
    onSuccess: async (data, variables, context) => {
      await utils.category.list.cancel();
    },
    onSettled: async (data, variables, context) => {
      await utils.category.list.invalidate();
    },
  });

  return {
    list,
    update,
  };
};
