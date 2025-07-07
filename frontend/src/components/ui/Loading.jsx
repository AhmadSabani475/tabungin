import LoadingBar from "react-redux-loading-bar";

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <LoadingBar
        style={{ height: "4px", backgroundColor: "#3b82f6" }} // warna biru terang supaya kelihatan
      />
    </div>
  );
}

export default Loading;
