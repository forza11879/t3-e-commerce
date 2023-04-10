import { useRef, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
// import Link from 'next/link';
import {
  useQueryCategories,
  useMutationCreateCategory,
  // useMutationRemoveCategory,
  // categoryQueryKeys,
} from '@/hooks/query/category';
import AdminRoute from '@/components/lib/AdminRoute';
import AdminNav from '@/components/nav/AdminNav';
import CategoryForm from '@/components/forms/CategoryForm';
// import LocalSearch from '@/components/forms/LocalSearch';
import { api } from "@/utils/api";
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// type CategoryOutput = RouterOutputs['category']['create']

const CategoryCreate = () => {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // const authenticated = status === "authenticated";
  // const userRole = session?.user.role === "USER";

  // useEffect(() => {
  //   if (authenticated && userRole) void router.push('/')
  // }, [authenticated, userRole, router])

  // const [keyword, setKeyword] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, error, isFetching } = useQueryCategories();

  console.log({ data });

  const mutationCreateCategory = useMutationCreateCategory()

  // const mutationRemoveCategory = useMutationRemoveCategory();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (nameInputRef.current && formRef.current) {
        const enteredName = nameInputRef.current.value;
        console.log({ enteredName });
        const options = {
          name: enteredName
        };
        mutationCreateCategory.mutate(options);
        formRef.current.reset();
      }
    } catch (error) {
      console.log('handleSubmit CategoryCreate error: ', error);
      // if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  // const handleRemove = async (slug) => {
  //   const options = {
  //     url: `${process.env.api}/category/${slug}`,
  //     token: token,
  //     data: { slug },
  //   };

  //   if (window.confirm('Delete?')) {
  //     try {
  //       mutationRemoveCategory.mutate(options);
  //     } catch (error) {
  //       console.log('handleRemove error: ', error);
  //       // if (err.response.status === 400) {
  //       // toast.error(error.response.data);
  //       // }
  //     }
  //   }
  // };

  // const searched = (keyword) => (item) =>
  //   item.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <AdminRoute>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {isLoading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : isFetching ? (
              <h4 className="text-danger">Updating...</h4>
            ) : (
              <h4>Create Category</h4>
            )}
            {/* {isFetching ? <h4 className="text-danger">Updating...</h4> : null} */}
            {/* {categoryForm()} */}
            <CategoryForm
              formRef={formRef}
              nameInputRef={nameInputRef}
              // mutation={mutationCreateCategory}
              isLoading={mutationCreateCategory.isLoading}
              isError={mutationCreateCategory.isError}
              // error={mutationCreateCategory.error}
              handleSubmit={handleSubmit}
            />
            {/* <LocalSearch keyword={keyword} setKeyword={setKeyword} /> */}

            {/* {isError ? (
            <h4 className="text-danger">{error.message}</h4>
          ) : data.length ? (
            data.filter(searched(keyword)).map((item) => (
              <div className="alert alert-secondary" key={item._id}>
                {item.name}
                <span
                  onClick={() => handleRemove(item.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link href={`/admin/category/${item.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            ))
          ) : (
            <p>No Data</p>
          )} */}
          </div>
        </div>
      </AdminRoute>
    </div>
  );
};

export default CategoryCreate;
