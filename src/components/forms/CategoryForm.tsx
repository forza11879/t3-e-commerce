// import type { UseTRPCMutationResult } from '@trpc/server'
type CategoryFormProps = {
  formRef: React.RefObject<HTMLFormElement>;
  nameInputRef: React.RefObject<HTMLInputElement>;
  // mutation: () => void;
  // mutation: (...args: any) => any
  // mutations: UseTRPCMutationResult
  isLoading: boolean;
  isError: boolean;
  // error?: React.ReactNode | Error | null;
  // error?: React.ReactNode | Error | null;
  name?: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

const CategoryForm = ({ ...props }: CategoryFormProps) => (
  <form ref={props.formRef} onSubmit={props.handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        ref={props.nameInputRef}
        defaultValue={""}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">
        {props.isLoading
          ? 'Saving...'
          : props.isError
            ? 'Error'
            : 'Save'}
      </button>
      {props.isError ? (
        // <pre>{console.log(mutation.error)}</pre>
        // <pre>{error}</pre>
        <pre>Error</pre>
      ) : null}
    </div>
  </form>
);

export default CategoryForm;
