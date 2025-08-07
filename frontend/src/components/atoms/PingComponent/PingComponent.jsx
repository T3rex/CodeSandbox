import usePing from "../../../hooks/apis/queries/usePing.js";
export const PingComponent = () => {
  const { isLoading, isError, data, error, setToggle } = usePing();
  return (
    <div>
      <button onClick={() => setToggle((prev) => !prev)}>ping</button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
};
