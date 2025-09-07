import usePing from "../../../hooks/apis/queries/usePing.js";
export const PingComponent = () => {
  const { isLoading, isError, data, error, setToggle } = usePing();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <button
        onClick={() => setToggle((prev) => !prev)}
        style={{
          padding: "0.5em 1em",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007acc",
          color: "white",
          cursor: "pointer",
        }}
      >
        ping
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
};
