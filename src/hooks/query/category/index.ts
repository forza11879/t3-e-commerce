import { api } from "@/utils/api";
import type { Category } from "@prisma/client";

// Query
export const useQueryCategories = () => {
  return api.category.list.useQuery();
};

export const useQueryCategory = (slug: string) => {
  return api.category.read.useQuery(
    { slug },
    {
      enabled: Boolean(slug),
    }
  );
};

// Mutation

export const useMutationCreateCategory = () => {
  // const queryClient = useQueryClient();
  const utils = api.useContext();

  return api.category.create.useMutation({
    onMutate: async (variables) => {
      // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
      await utils.category.list.invalidate();
      console.log("onMutate variables: ", variables);
      // queryClient.cancelQueries(...categoryQueryKeys.categories);

      // Snapshot the previous value
      // In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.
      utils.category.list.setData(undefined, (oldQueryData) => {
        console.log("onMutate oldQueryData: ", oldQueryData);
        const newCategory: Category = {
          id: crypto.randomUUID(),
          name: variables.name,
          slug: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        if (oldQueryData) {
          const newQueryData = [newCategory, ...oldQueryData];
          console.log("onMutate newQueryData: ", newQueryData);
          return newQueryData;
        }
      });

      // return will pass the function or the value to the onError third argument:
      return () =>
        // queryClient.setQueryData(
        //     ...categoryQueryKeys.categories,
        //     previousQueryDataArray
        // );
        utils.category.list.setData(undefined, (oldQueryData) => oldQueryData);
    },
    onError: (error, variables, rollback) => {
      //   If there is an errror, then we will rollback
      // console.log('CreateCategory onError error: ', error.response.data);
      if (rollback) {
        rollback();
        console.log("rollback");
      }
      // if (error) {
      //     toast.error(error.response.data);
      // }
    },
    onSuccess: (data, variables, context) => {
      // Runs only there is a success
      // saves http trip to the back-end
      console.log("onSuccess data: ", data);
      if (data) {
        utils.category.list.setData(undefined, (oldQueryData) => {
          console.log("onSuccess oldQueryData: ", oldQueryData);
          const newQueryData = oldQueryData?.filter(
            (item) => item.name !== data.name
          );
          console.log("onSuccess newQueryData: ", newQueryData);
          newQueryData?.unshift(data);
          console.log("onSuccess after unshift newQueryData: ", newQueryData);

          return newQueryData;
        });
        // toast.success(`"${data.name}" is created`);
      }
    },
    onSettled: async (data, error, variables, context) => {
      // if (error) {
      //     // console.log(
      //     //   'CreateCategory onSettled error: ',
      //     //   error.response.data.error
      //     // );
      //     toast.error(error.response.data.error);
      // }
      // Runs on either success or error. It is better to run invalidateQueries
      // onSettled in case there is an error to re-fetch the request
      // it is prefered to invalidateQueries  after using setQueryData inside onSuccess: because you are getting the latest data from the server
      // queryClient.invalidateQueries(...categoryQueryKeys.categories);
      await utils.category.list.invalidate();
    },
  });
};

export const useMutationRemoveCategory = () => {
  const utils = api.useContext();
  //     // const queryClient = useQueryClient();
  // const previousQueryDataArray = utils.category.list.getData();

  return api.category.remove.useMutation({
    onMutate: async (variables) => {
      // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
      // queryClient.cancelQueries(queryKeys.categories);
      await utils.category.list.invalidate();
      // Snapshot the previous value
      // const previousQueryDataArray = queryClient.getQueryData(
      //     ...categoryQueryKeys.categories
      // );
      // const previousQueryDataArray = utils.category.list.getData();

      // In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.
      // queryClient.setQueryData('categoryList', (oldQueryData) => {
      //   const oldQueryDataArray = JSON.parse(oldQueryData);
      //   const newQueryDataArray = oldQueryDataArray.filter(
      //     (item) => item.slug !== slug
      //   );
      //   return JSON.stringify(newQueryDataArray);
      // });
      // if thre is an error return will pass the function or the value to the onError third argument:
      // return () =>
      //     queryClient.setQueryData(
      //         ...categoryQueryKeys.categories,
      //         previousQueryDataArray
      //     );
      return () =>
        utils.category.list.setData(undefined, (previousQueryDataArray) => {
          console.log(
            "onMutate previousQueryDataArray:",
            previousQueryDataArray
          );
          return previousQueryDataArray;
        });
    },
    onError: (error, variables, rollback) => {
      // Runs on error
      // toast.error(error.response.data.message);
      // console.log('onError error: ', error.response.data.message);
      if (rollback) {
        rollback();
        console.log("delete rollback");
      }
    },
    onSuccess: (data, variables, context) => {
      // Runs only there is a success
      // if (data) {
      //   queryClient.setQueryData('categoryList', (oldQueryData) => {
      //     const oldQueryDataArray = JSON.parse(oldQueryData);
      //     const newQueryDataArray = oldQueryDataArray.filter(
      //       (item) => item.slug !== data.deleted.slug
      //     );
      //     return JSON.stringify(newQueryDataArray);
      //   });
      //   toast.error(`${data.deleted.name} deleted`);
      // }
    },
    onSettled: async (data, variables, context) => {
      // Runs on either success or error. It is better to run invalidateQueries
      // onSettled in case there is an error to re-fetch the request
      // const previousQueryDataArray = utils.category.list.getData();
      if (data) {
        utils.category.list.setData(undefined, (previousQueryDataArray) => {
          const newQueryDataArray = previousQueryDataArray?.filter((item) => {
            return item.slug !== data.slug;
          });
          return newQueryDataArray;
        });

        //     // toast.error(`${data.deleted.name} deleted`);
        // }
        await utils.category.list.invalidate();
      }
    },
  });
};

export const useMutationUpdateCategory1 = () => {
  const utils = api.useContext();

  return api.category.update.useMutation({
    onMutate: async (variables) => {
      // console.log("variables: ", variables);
      // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
      await utils.category.list.cancel();
      // Snapshot the previous value
      const previousQueryData = utils.category.list.getData();
      // In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.
      const newCategory: Category = {
        id: crypto.randomUUID(),
        name: variables.name,
        slug: variables.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      utils.category.list.setData(undefined, (oldQueryData) => {
        if (oldQueryData) {
          let lastIndex;
          const oldQueryDataLength = oldQueryData.length - 1;
          const newQueryData = oldQueryData.filter((item) => {
            if (item.slug === variables.slug) {
              lastIndex = oldQueryData.lastIndexOf(item);
              // console.log("equal variables.slug:", variables.slug);

              // console.log("equal item.slug:", item.slug);
            }
            // console.log("out equal variables.slug:", variables.slug);

            // console.log("out equal item.slug:", item.slug);

            return item.slug !== variables.slug;
          });
          // console.log("oldQueryData: ", oldQueryData);
          // console.log("before newQueryData: ", newQueryData);
          // console.log({ lastIndex });
          // console.log("oldQueryDataLength:", oldQueryDataLength);

          // newQueryData.unshift(newCategory)
          // console.log("after newQueryData: ", newQueryData);

          if (lastIndex !== oldQueryDataLength) {
            newQueryData.unshift(newCategory);
            console.log("UNSHIFT");
          }

          if (lastIndex === oldQueryDataLength) {
            newQueryData.push(newCategory);
            console.log("PUSH");
          }

          // return newQueryData.unshift(newCategory);

          return newQueryData;
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

      if (error) {
        // toast.error(error.response.data.error);
      }
    },
    onSuccess: async (data, variables, context) => {
      // Runs only there is a success
      // saves http trip to the back-end
      console.log("data: ", data);
      console.log("variables: ", variables);

      //   const newCategory: Category = {
      //     id: crypto.randomUUID(),
      //     name: variables.name,
      //     slug: variables.name,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   };

      //   utils.category.list.setData(undefined, (oldQueryData) => {
      //     if (oldQueryData) {
      //       let lastIndex;
      //       const oldQueryDataLength = oldQueryData.length - 1;
      //       const newQueryData = oldQueryData.filter((item) => {
      //         if (item.slug === variables.slug) {
      //           lastIndex = oldQueryData.lastIndexOf(item);
      //           // console.log("equal variables.slug:", variables.slug);

      //           // console.log("equal item.slug:", item.slug);
      //         }
      //         // console.log("out equal variables.slug:", variables.slug);

      //         // console.log("out equal item.slug:", item.slug);

      //         return item.slug !== variables.slug;
      //       });
      //       // console.log("oldQueryData: ", oldQueryData);
      //       // console.log("before newQueryData: ", newQueryData);
      //       // console.log({ lastIndex });
      //       // console.log("oldQueryDataLength:", oldQueryDataLength);

      //       // newQueryData.unshift(newCategory)
      //       // console.log("after newQueryData: ", newQueryData);

      //       if (lastIndex !== oldQueryDataLength) {
      //         newQueryData.unshift(newCategory);
      //         console.log("UNSHIFT");
      //       }

      //       if (lastIndex === oldQueryDataLength) {
      //         newQueryData.push(newCategory);
      //         console.log("PUSH");
      //       }

      //       // return newQueryData.unshift(newCategory);

      //       return newQueryData;
      //     }
      //   });
      //     // toast.success(`"${data.name}" is created`);
      await utils.category.list.invalidate();
    },
    onSettled: async (data, error, variables, context) => {
      if (error) {
        // toast.error(error.response.data.error);
      }
      // Runs on either success or error. It is better to run invalidateQueries
      // onSettled in case there is an error to re-fetch the request
      // it is prefered to invalidateQueries  after using setQueryData inside onSuccess: because you are getting the latest data from the server
      //   await utils.category.list.invalidate();
    },
  });
};

export const useMutationUpdateCategory = () => {
  const utils = api.useContext();

  return api.category.update.useMutation({
    onMutate: async (variables) => {
      // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
      await utils.category.list.cancel();
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
          const lastIndex =
            oldQueryData.findIndex((item) => item.slug === variables.slug) ??
            -1;
          if (lastIndex === oldQueryData.length - 1) {
            return [...filteredData, newCategory];
          } else {
            return [newCategory, ...filteredData];
          }
        }
      });

      // utils.category.list.setData(undefined, (oldQueryData) => {
      //   if (oldQueryData) {
      //     let lastIndex;
      //     const oldQueryDataLength = oldQueryData.length - 1;
      //     const newQueryData = oldQueryData.filter((item) => {
      //       if (item.slug === variables.slug) {
      //         lastIndex = oldQueryData.lastIndexOf(item);
      //       }
      //       return item.slug !== variables.slug;
      //     });

      //     if (lastIndex !== oldQueryDataLength) {
      //       newQueryData.unshift(newCategory);
      //       console.log("UNSHIFT");
      //     }

      //     if (lastIndex === oldQueryDataLength) {
      //       newQueryData.push(newCategory);
      //       console.log("PUSH");
      //     }
      //     return newQueryData;
      //   }
      // });
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
    onSettled: async (data, variables, context) => {
      await utils.category.list.invalidate();
    },
  });
};

export const useMutationUpdateCategory2 = () => {
  const utils = api.useContext();

  return api.category.update.useMutation({
    onMutate: async (variables) => {
      // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
      await utils.category.list.cancel();
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
          const lastIndex =
            oldQueryData.findIndex((item) => item.slug === variables.slug) ??
            -1;
          if (lastIndex === oldQueryData.length - 1) {
            return [...filteredData, newCategory];
          } else {
            return [newCategory, ...filteredData];
          }
        }
      });

      // Return a function to be used in the onError callback
      return () => utils.category.list.setData(undefined, previousQueryData);
    },

    onError: (error, variables, rollback) => {
      // If there is an error, rollback the mutation
      if (rollback) {
        rollback();
      }
    },

    onSettled: async (data, variables, context) => {
      await utils.category.list.invalidate();
    },
  });
};
