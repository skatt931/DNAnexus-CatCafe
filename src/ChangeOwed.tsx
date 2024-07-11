import React from "react";

type ChangeOwnedProps = {
  change: Record<string, number>;
  message: string;
};

function ChangeOwed({change, message}: ChangeOwnedProps) {
  return (
    <div className="customer-change-container">
      <div className="customer-change-title">
        {message ? "You paid the exact amount!" : "Customer Change"}
      </div>
      {message && (
        <div className="cat-fact-container">
          <div className="cat-fact-title">Here is a cat fact for you:</div>
          <div className="cat-fact-message">{message}</div>
        </div>
      )}
      <div className="customer-change-content">
        {Object.entries(change)
          .reverse()
          .map(([denomination, count]) => {
            return (
              count > 0 && (
                <div className="change-item" key={denomination}>
                  <div className="change-number">{count}</div>
                  <div className="change-detail">{denomination} Mewla</div>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}

export default ChangeOwed;
