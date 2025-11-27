import { Form, Formik, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';

import css from './NoteForm.module.css';

interface FormValuesProps {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose: () => void;
}

const INITIAL_VALUES: FormValuesProps = {
  title: '',
  content: '',
  tag: 'Todo',
};

function NoteForm({ onClose }: NoteFormProps) {
  const handleSubmit = (
    values: FormValuesProps,
    formikHelpers: FormikHelpers<FormValuesProps>
  ) => {
    console.log(values);
    formikHelpers.resetForm();
    onClose();
  };

  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              // disabled=false
            >
              Create note
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default NoteForm;
