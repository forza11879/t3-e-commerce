import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  useCategoryActions
} from '@/hooks/query/category';
import AdminRoute from '@/components/lib/AdminRoute';
import AdminNav from '@/components/nav/AdminNav';
import CategoryForm from '@/components/forms/CategoryForm';
import LocalSearch from '@/components/forms/LocalSearch';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Category } from '@prisma/client';

// type CategoryOutput = RouterOutputs['category']['create']

const CategoryCreate = () => {

  const [keyword, setKeyword] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    list: { data, isLoading, isError, error, isFetching },
    create: mutationCreateCategory,
    remove: mutationRemoveCategory
  } = useCategoryActions();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (nameInputRef.current && formRef.current) {
        const enteredName = nameInputRef.current.value;
        // console.log({ enteredName });
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

  const handleRemove = (slug: string) => {
    const options = {
      slug,
    };

    if (window.confirm('Delete?')) {
      try {
        mutationRemoveCategory.mutate(options);
      } catch (error) {
        console.log('handleRemove error: ', error);
        // if (err.response.status === 400) {
        // toast.error(error.response.data);
        // }
      }
    }
  };

  const searched = (keyword: string) => (item: Category) => {

    return item.name.toLowerCase().includes(keyword);

  }

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
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {isError ? (
              <h4 className="text-danger">{error?.message}</h4>
            ) : data?.length ? (
              data.filter(searched(keyword)).map((item) => {
                console.log("item: ", item.name)
                return <div className="alert alert-secondary" key={item.id}>
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

              }
              )
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </AdminRoute>
    </div>
  );
};

export default CategoryCreate;
