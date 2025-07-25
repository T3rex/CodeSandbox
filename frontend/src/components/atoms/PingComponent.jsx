import usePing from "../../hooks/apis/queries/usePing";
export const PingComponent = () => {
  const { isLodaing, isError, data, error } = usePing();
  if (isLodaing) {
    return <div>Loading...</div>;
  }
  return <div>{isError ? "Error" : data?.message}</div>;
};
