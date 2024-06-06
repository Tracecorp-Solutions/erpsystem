import SearchAccount from "./SearchAccount ";

const Statement = () => {
    return (
        <div
        className="bg-white"
        style={{
          borderRadius: "54px",
          borderRadius: "24px",
          padding: "10px",
        }}
      >
        <SearchAccount />
        <h3
          style={{
            margin: "10px",
            color: "#A1A1A1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "400",
          }}
        >
          3/15/2024
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4" style={{
            borderTop: "1px solid #7A7A7A"
        }}>
          <div className="bg-white rounded p-4">
            {/* Item 1 */}
            Item 1
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 2 */}
            Item 2
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 3 */}
            Item 3
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 1 */}
            Item 1
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 2 */}
            Item 2
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 3 */}
            Item 3
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 1 */}
            Item 1
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 2 */}
            Item 2
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 3 */}
            Item 3
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 1 */}
            Item 1
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 2 */}
            Item 2
          </div>
          <div className="bg-white rounded p-4">
            {/* Item 3 */}
            Item 3
          </div>
        </div>
      </div>
    );
}

export default Statement;
