import { api } from "@/utils/api";
import type { Category } from '@prisma/client';

// export const categoryQueryKeys = {
//     categories: getQueryKey(api.category.list, undefined, 'query'),
//     // categories: ['categories'],
//     category: (id: string) => [...categoryQueryKeys.categories, id],
//     productsByCategory: (id: string) => [...categoryQueryKeys.categories, 'products', id],
// };

// export const useMutationCreateCategory = () => {
//     return api.category.create.useMutation();
// }

export const useMutationCreateCategoryy = () => {
    // const queryClient = useQueryClient();
    const utils = api.useContext();

    return api.category.create.useMutation({
        onMutate: async (variables) => {
            // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
            await utils.category.list.invalidate()
            console.log("onMutate variables: ", variables);
            // queryClient.cancelQueries(...categoryQueryKeys.categories);

            // Snapshot the previous value
            // In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.
            const newObject = {
                name: variables.name,
            };

            utils.category.list.setData(
                undefined,
                (oldQueryData) => {
                    console.log("onMutate oldQueryData: ", oldQueryData);
                    // const newQueryData = [newObject, ...oldQueryData]
                    const newQueryData = [newObject, ...oldQueryData]
                    console.log("onMutate newQueryData: ", newQueryData);
                    return newQueryData
                }
                // {
                //     const newQueryData = oldQueryData?.filter(
                //         (item) => item.name !== variables.name
                //     );
                //     newQueryData?.unshift(newObject);
                //     return newQueryDataArray
                // }
            );

            // return will pass the function or the value to the onError third argument:
            return () =>
                // queryClient.setQueryData(
                //     ...categoryQueryKeys.categories,
                //     previousQueryDataArray
                // );
                utils.category.list.setData(
                    undefined,
                    (oldQueryData) => oldQueryData
                );

        },
        onError: (error, variables, rollback) => {
            //   If there is an errror, then we will rollback
            // console.log('CreateCategory onError error: ', error.response.data);
            if (rollback) {
                rollback();
                console.log('rollback');
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
                utils.category.list.setData(
                    undefined,
                    (oldQueryData) => {
                        console.log("onSuccess oldQueryData: ", oldQueryData);
                        const newQueryData = oldQueryData?.filter(
                            (item) => item.name !== data.name
                        );
                        console.log("onSuccess newQueryData: ", newQueryData);
                        newQueryData?.unshift(data);
                        console.log("onSuccess after unshift newQueryData: ", newQueryData);

                        return newQueryData;
                    }
                );
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
            await utils.category.list.invalidate()
        },
    }
    );
};

export const useQueryCategories = () => {
    return api.category.list.useQuery();
}

export const useMutationRemoveCategory = () => {
    const utils = api.useContext();
    //     // const queryClient = useQueryClient();
    // const previousQueryDataArray = utils.category.list.getData();


    return api.category.remove.useMutation(
        {
            onMutate: async (variables) => {
                // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
                // queryClient.cancelQueries(queryKeys.categories);
                await utils.category.list.invalidate()
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
                        console.log("onMutate previousQueryDataArray:", previousQueryDataArray)
                        return previousQueryDataArray
                    });
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
                // const previousQueryDataArray = utils.category.list.getData();
                if (data) {
                    utils.category.list.setData(
                        undefined,
                        (previousQueryDataArray) => {
                            const newQueryDataArray = previousQueryDataArray?.filter(
                                (item) => {
                                    return item.slug !== data.slug
                                }
                            );
                            return newQueryDataArray
                        }
                    );

                    //     // toast.error(`${data.deleted.name} deleted`);
                    // }
                    await utils.category.list.invalidate();
                }
            }
        }
    )
};


export const useMutationCreateCategory = () => {
    const utils = api.useContext();

    return api.category.create.useMutation({
        onMutate: async (variables) => {

            await utils.category.list.invalidate()

            utils.category.list.setData(
                undefined,
                (oldQueryData) => {
                    console.log("onMutate oldQueryData: ", oldQueryData);
                    const newCategory: Category = {
                        id: crypto.randomUUID(),
                        name: variables.name,
                        slug: "",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    if (oldQueryData) {
                        const newQueryData = [newCategory, ...oldQueryData]
                        console.log("onMutate newQueryData: ", newQueryData);
                        return newQueryData;
                    }
                }


            )


            // return will pass the function or the value to the onError third argument:
            return () =>
                utils.category.list.setData(
                    undefined,
                    (oldQueryData) => oldQueryData
                );

        },
        onError: (error, variables, rollback) => {
            //   If there is an errror, then we will rollback
            // console.log('CreateCategory onError error: ', error.response.data);
            if (rollback) {
                rollback();
                console.log('rollback');
            }
        },
        onSuccess: (data, variables, context) => {
            // Runs only there is a success
            // saves http trip to the back-end
            if (data) {
                utils.category.list.setData(
                    undefined,
                    (oldQueryData) => {
                        const newQueryData = oldQueryData?.filter(
                            (item) => item.name !== data.name
                        );
                        newQueryData?.unshift(data);

                        return newQueryData;
                    }
                );
            }
        },
        onSettled: async (data, error, variables, context) => {
            // Runs on either success or error. It is better to run invalidateQueries
            // onSettled in case there is an error to re-fetch the request
            // it is prefered to invalidateQueries  after using setQueryData inside onSuccess: because you are getting the latest data from the server
            await utils.category.list.invalidate()
        },
    }
    );
};