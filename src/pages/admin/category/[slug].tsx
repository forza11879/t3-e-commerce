import { useRef } from 'react';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import AdminRoute from '@/components/lib/AdminRoute';
import AdminNav from '@/components/nav/AdminNav';
import CategoryForm from '@/components/forms/CategoryForm';
import type { RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
type CategoryOutput = RouterOutputs['category']['read'];

const CategoryUpdate = () => {
  const slug = useRouter().query.slug as string;
  console.log({ slug });
  const category = api.category.read.useQuery({
    slug,
  });

  const { data: categoryData } = category;

  console.log({ categoryData });

  // const { name } = categoryData;

  // console.log({ name });
  // const mutationUpdateCategory = api.category.update.useMutation({ name });


  console.log({ category });

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  // const router = useRouter();

  // const { data, isLoading } = useQueryCategory(id, slug);

  // console.log({ data });

  // const { name } = data;

  // const mutationUpdateCategory = useMutationUpdateCategory();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const enteredName = nameInputRef.current?.value
    console.log({ enteredName });
    // const options = {
    //   url: `/category/${slug}`,
    //   method: 'put',
    //   token: token,
    //   slug: slug,
    //   data: { name: enteredName },
    // };

    try {
      // mutationUpdateCategory.mutate(options);
      // router.push('/admin/category');
      //   formRef.current.reset();
    } catch (error) {
      console.log(error);
      // if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  return (
    <div className="container-fluid">
      <AdminRoute>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {/* {isLoading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : ( */}
            <h4>Update Category</h4>
            {/* )} */}
            <CategoryForm
              formRef={formRef}
              nameInputRef={nameInputRef}
              // mutation={mutationUpdateCategory}
              // name={name}
              handleSubmit={handleSubmit}
            />
            <hr />
          </div>
        </div>
      </AdminRoute>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   // const { req, res } = context;
//   const {
//     params: { slug },
//   } = context;

//   const { appToken } = nookies.get(context);

//   const result = await readCategory(slug);

//   const newObj = {
//     id: result._id,
//     name: result.name,
//     slug: result.slug,
//   };

//   const id = JSON.parse(JSON.stringify(newObj.id));

//   const categoryRead = () => {
//     return JSON.stringify(newObj);
//   };

//   try {
//     // Using Hydration
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery(
//       categoryQueryKeys.category(id),
//       categoryRead,
//       null,
//       {
//         // force: true, // forced prefetch regadless if the data is stale(forced prefetching)
//       }
//     );

//     return {
//       props: {
//         id: id,
//         token: appToken,
//         slug: slug,
//         dehydratedState: dehydrate(queryClient),
//       }, // will be passed to the page component as props. always return an object with the props key
//     };
//   } catch (error) {
//     console.log(
//       'error CategoryUpdate getServerSideProps: ',
//       // error.errorInfo.message
//       error
//     );
//     if (error) {
//       return {
//         // notFound: true,
//         redirect: {
//           destination: '/login',
//           permanent: false,
//           // statusCode - In some rare cases, you might need to assign a custom status code for older HTTP Clients to properly redirect. In these cases, you can use the statusCode property instead of the permanent property, but not both.
//         },
//       };
//     }
//   }
// }

export default CategoryUpdate;
