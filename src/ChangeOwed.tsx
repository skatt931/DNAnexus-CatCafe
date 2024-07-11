import React from "react";

type ChangeOwnedProps = {
  change: Record<string, number>;
  message: string;
};

function ChangeOwed({change, message}: ChangeOwnedProps) {
  const titleMessage = message
    ? "You paid the exact amount!"
    : "Customer Change";

  const renderChangeItems = () =>
    Object.entries(change)
      .filter(([, count]) => count > 0)
      .map(([denomination, count]) => (
        <div className="change-item" key={denomination}>
          <div className="change-number">{count}</div>
          <div className="change-detail">{denomination} Mewla</div>
        </div>
      ));

  return (
    <div className="customer-change-container">
      <div className="customer-change-title">{titleMessage}</div>
      {message && (
        <div className="cat-fact-container">
          <div className="cat-fact-title">Here is a cat fact for you:</div>
          <div className="cat-fact-message">{message}</div>
        </div>
      )}
      <div className="customer-change-content">{renderChangeItems()}</div>
    </div>
  );
}

export default ChangeOwed;
