import React, { useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  useCategoryActions,
  useSubCategoryActions
} from "@/hooks/query";
import AdminRoute from "@/components/lib/AdminRoute";
import AdminNav from "@/components/nav/AdminNav";
import CategoryForm from "@/components/forms/CategoryForm";
import LocalSearch from "@/components/forms/LocalSearch";
import type { SubCategory } from '@prisma/client';

const SubCreate = () => {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const categoryQuery = useCategoryActions();

  const {
    list: { data, isLoading, isError, error, isFetching },
    create: mutationCreateSubCategory,
    remove: mutationRemoveSubCategory
  } = useSubCategoryActions();



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if (nameInputRef.current && formRef.current) {
        const enteredName = nameInputRef.current.value;

        const options = {
          name: enteredName,
          categoryId: category,
        };
        console.log({ options });

        mutationCreateSubCategory.mutate(options);
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
    if (window.confirm("Delete?")) {
      mutationRemoveSubCategory.mutate(options);
    }
  };

  const searched = (keyword: string) => (item: SubCategory) =>
    item.name.toLowerCase().includes(keyword);

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
              <h4>Create Subcategory</h4>
            )}

            <div className="form-group">
              <label>Parent category</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please select</option>
                {
                  // categoryQuery.list.data?.length > 0 &&
                  categoryQuery.list.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              formRef={formRef}
              nameInputRef={nameInputRef}
              // mutation={mutationCreateCategory}
              isLoading={mutationCreateSubCategory.isLoading}
              isError={mutationCreateSubCategory.isError}
              // error={mutationCreateCategory.error}
              handleSubmit={handleSubmit}
            />


            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {isError ? (
              <h4 className="text-danger">{error?.message}</h4>
            ) : data?.length ? (
              data.filter(searched(keyword)).map((item) => (
                <div className="alert alert-secondary" key={item.id}>
                  {item.name}
                  <span
                    onClick={() => handleRemove(item.slug)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link href={`/admin/subcategory/${item.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </AdminRoute>
    </div>
  );
};

export default SubCreate;
