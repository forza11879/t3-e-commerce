import { api } from "@/utils/api";

export const categoryQueryKeys = {
    categories: ['categories'],
    category: (id: string) => [...categoryQueryKeys.categories, id],
    productsByCategory: (id: string) => [...categoryQueryKeys.categories, 'products', id],
};

export const useMutationCreateCategory = () => {
    return api.category.create.useMutation();
}

export const useQueryCategories = () => {
    return api.category.list.useQuery();
}

// export const useMutationUpdateCategoryy = () => {
//     const queryClient = useQueryClient();
//     return useMutation(
//         async ({ url, method, token, data }) => {
//             return await axios.request({
//                 baseURL,
//                 url,
//                 method,
//                 data,
//                 headers: { token },
//             });
//         },
//         {
//             onMutate: ({ name, slug }) => {
//                 // Cancel any outgoing refetches (so they don't overwrite(race condition) our optimistic update)
//                 queryClient.cancelQueries(...categoryQueryKeys.categories);

//                 // Snapshot the previous value
//                 const previousQueryDataArray = queryClient.getQueryData(
//                     ...categoryQueryKeys.categories
//                 );
//                 // In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.
//                 const newObject = {
//                     _id: Date.now(),
//                     name: name,
//                 };
//                 queryClient.setQueryData(
//                     ...categoryQueryKeys.categories,
//                     (oldQueryData) => {
//                         const oldQueryDataArray = JSON.parse(oldQueryData);
//                         const newQueryDataArray = oldQueryDataArray.filter(
//                             (item) => item.slug !== slug
//                         );
//                         newQueryDataArray.unshift(newObject);

//                         return JSON.stringify(newQueryDataArray);
//                     }
//                 );
//                 // return will pass the function or the value to the onError third argument:
//                 return () =>
//                     queryClient.setQueryData(
//                         ...categoryQueryKeys.categories,
//                         previousQueryDataArray
//                     );
//             },
//             onError: (error, variables, rollback) => {
//                 //   If there is an errror, then we will rollback
//                 if (rollback) {
//                     rollback();
//                     console.log('rollback');
//                 }

//                 if (error) {
//                     toast.error(error.response.data.error);
//                 }
//             },
//             onSuccess: ({ data }, { slug }, context) => {
//                 // Runs only there is a success
//                 // saves http trip to the back-end
//                 if (data) {
//                     queryClient.setQueryData(
//                         ...categoryQueryKeys.categories,
//                         (oldQueryData) => {
//                             const oldQueryDataArray = JSON.parse(oldQueryData);
//                             const newQueryDataArray = oldQueryDataArray.filter(
//                                 (item) => item.slug !== slug
//                             );
//                             newQueryDataArray.unshift(data);
//                             return JSON.stringify(newQueryDataArray);
//                         }
//                     );
//                     toast.success(`"${data.name}" is created`);
//                 }
//             },
//             onSettled: ({ data }, error, variables, context) => {
//                 if (error) {
//                     toast.error(error.response.data.error);
//                 }
//                 // Runs on either success or error. It is better to run invalidateQueries
//                 // onSettled in case there is an error to re-fetch the request
//                 // it is prefered to invalidateQueries  after using setQueryData inside onSuccess: because you are getting the latest data from the server
//                 queryClient.invalidateQueries(...categoryQueryKeys.categories);
//             },
//         }
//     );
// };