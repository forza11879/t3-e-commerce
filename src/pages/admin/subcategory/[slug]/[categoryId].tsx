import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import AdminNav from '@/components/nav/AdminNav';
import CategoryForm from '@/components/forms/CategoryForm';
import {
  useCategoryActions,
  useSubCategoryActions
} from '@/hooks/query';

const SubUpdate = () => {
  const router = useRouter()

  const slug = typeof router.query?.slug === 'string' ? router.query.slug : '';

  const categoryId = typeof router.query?.categoryId === 'string' ? router.query.categoryId : '';

  const [parentInput, setParentInput] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    read,
    update: mutationUpdateSubCategory,
  } = useSubCategoryActions();

  const { data, isLoading } = read(slug);

  const categoryQuery = useCategoryActions();

  useEffect(() => {
    setParentInput(categoryId);
  }, []);


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if (nameInputRef.current && formRef.current) {

        const enteredName = nameInputRef.current.value;

        const options = {
          slug: slug,
          name: enteredName,
          categoryId: categoryId,
        };

        mutationUpdateSubCategory.mutate(options);
        void router.push('/admin/subcategory');
        //   formRef.current.reset();
      }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 400) toast.error(error.response.data);
    }

    // toast.success(`"${res.data.name}" is updated`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {isLoading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update Subcategory</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParentInput(e.target.value)}
            >
              <option>Please select</option>
              {
                // categoryQuery.list.data?.length > 0 &&
                parentInput &&
                categoryQuery.list.data?.map((item) => {

                  return <option
                    key={item.id}
                    value={item.id}
                    // defaultValue={item.id === parentInput}
                    selected={item.id === parentInput}
                  // selected={item.id === data?.category?.id}

                  >
                    {item.name}
                  </option>
                }
                )}
            </select>
          </div>

          <CategoryForm
            formRef={formRef}
            nameInputRef={nameInputRef}
            // mutation={mutationCreateCategory}
            isLoading={mutationUpdateSubCategory.isLoading}
            isError={mutationUpdateSubCategory.isError}
            name={data ? data?.name : ''}
            // error={mutationCreateCategory.error}
            handleSubmit={handleSubmit}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};



export default SubUpdate;
