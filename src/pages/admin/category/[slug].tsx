import { useRef } from 'react';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import AdminRoute from '@/components/lib/AdminRoute';
import AdminNav from '@/components/nav/AdminNav';
import CategoryForm from '@/components/forms/CategoryForm';
import type { RouterOutputs } from "@/utils/api";
import {
  useCategoryActions
} from '@/hooks/query';

// type CategoryOutput = RouterOutputs['category']['read'];

const CategoryUpdate = () => {
  const router = useRouter()
  const slug = router.query.slug as string;
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    read,
    update: mutationUpdateCategory,
  } = useCategoryActions();

  const { data, isLoading } = read(slug);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (nameInputRef.current && formRef.current) {
      try {
        const enteredName = nameInputRef.current.value
        console.log("enteredName: ", enteredName);
        const options = {
          slug: slug,
          name: enteredName,
        };
        mutationUpdateCategory.mutate(options);
        void router.push('/admin/category');
        formRef.current.reset();
      } catch (error) {
        console.log(error);
        // if (error.response.status === 400) toast.error(error.response.data);
      }
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
            {isLoading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : (
              <h4>Update Category</h4>
            )}
            <CategoryForm
              formRef={formRef}
              nameInputRef={nameInputRef}
              // mutation={mutationCreateCategory}
              isLoading={mutationUpdateCategory.isLoading}
              isError={mutationUpdateCategory.isError}
              name={data ? data.name : ''}
              // error={mutationCreateCategory.error}
              handleSubmit={handleSubmit}
            />
            <hr />
          </div>
        </div>
      </AdminRoute>
    </div>
  );
};

export default CategoryUpdate;
