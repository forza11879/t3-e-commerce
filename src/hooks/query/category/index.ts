import { api } from "@/utils/api";

// export const categoryQueryKeys = {
//     categories: getQueryKey(api.category.list, undefined, 'query'),
//     // categories: ['categories'],
//     category: (id: string) => [...categoryQueryKeys.categories, id],
//     productsByCategory: (id: string) => [...categoryQueryKeys.categories, 'products', id],
// };

export const useMutationCreateCategory = () => {
    return api.category.create.useMutation();
}
export const useQueryCategories = () => {
    return api.category.list.useQuery();
}

export const useMutationRemoveCategory = () => {
    const utils = api.useContext();
    //     // const queryClient = useQueryClient();
    // const categoryListKey = getQueryKey(api.category.list, undefined, 'query');
    // console.log({ categoryListKey });

    // const categoryKey = getQueryKey(api.category);
    // console.log({ categoryKey });

    return api.category.remove.useMutation(
        {
            onMutate: async (slug) => {
                // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
                // queryClient.cancelQueries(queryKeys.categories);
                await utils.category.list.invalidate()
                // Snapshot the previous value
                // const previousQueryDataArray = queryClient.getQueryData(
                //     ...categoryQueryKeys.categories
                // );
                const previousQueryDataArray = utils.category.list.getData();

                // In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.
                // queryClient.setQueryData('categoryList', (oldQueryData) => {
                //   const oldQueryDataArray = JSON.parse(oldQueryData);
                //   const newQueryDataArray = oldQueryDataArray.filter(
                //     (item) => item.slug !== slug
                //   );
                //   return JSON.stringify(newQueryDataArray);
                // });
                // if thre is a error return will pass the function or the value to the onError third argument:
                // return () =>
                //     queryClient.setQueryData(
                //         ...categoryQueryKeys.categories,
                //         previousQueryDataArray
                //     );
                return () =>
                    utils.category.list.setData(undefined, previousQueryDataArray);
            },
            onError: (error, variables, rollback) => {
                // Runs on error
                // toast.error(error.response.data.message);
                // console.log('onError error: ', error.response.data.message);
                if (rollback) {
                    rollback();
                    console.log('delete rollback');
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
                const previousQueryDataArray = utils.category.list.getData();


                if (data && previousQueryDataArray) {
                    // console.log('onSettled variables: ', variables);
                    // console.log('onSettled data.slug: ', data.slug);
                    // console.log('onSettled context', context);
                    // console.log('onSettled previousQueryDataArray', previousQueryDataArray);


                    const newQueryDataArray = previousQueryDataArray.filter(
                        (item) => {
                            // console.log('item.slug: ', item.slug);
                            return item.slug !== data.slug
                        }
                    );
                    // console.log('onSettled newQueryDataArray', newQueryDataArray);
                    utils.category.list.setData(
                        undefined,
                        newQueryDataArray
                    );
                    //     // toast.error(`${data.deleted.name} deleted`);
                    // }
                    await utils.category.list.invalidate();
                }
            }
        }
    )



};