type ErrorMessageProps = {
  error: string | Error;
};

function ErrorMessage({ error }: ErrorMessageProps) {
  const message = typeof error === 'string' ? error : error.message;
  return <p>An error occurred: {message}</p>;
}
export default ErrorMessage;
