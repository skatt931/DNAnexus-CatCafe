import React, {useState} from "react";
import ChangeOwed from "./ChangeOwed";

// Define denominations as constants
const DENOMINATIONS = [100, 33, 21, 7, 3, 1];
const CAT_FACTS_API =
  "https://mtpgyho8j0.execute-api.us-east-1.amazonaws.com/default/catFacts";
const FETCH_ERROR_MESSAGE =
  "There was an error fetching the cat fact. Please try again :)";

/**
 * MewlaConverter is a React component that calculates the change owed in different denominations.
 * It also fetches a cat fact from an API when the change owed is exactly 0.
 */
function MewlaConverter() {
  const [change, setChange] = useState<{[key: number]: number}>({});
  const [message, setMessage] = useState("");
  const [amountCharged, setAmountCharged] = useState<number>();
  const [amountTendered, setAmountTendered] = useState<number>();

  /**
   * calculateChange is a function that calculates the change owed in different denominations.
   * @param amountCharged - The amount charged
   * @param amountTendered - The amount tendered
   * @returns An object where the keys are the denominations and the values are the number of each denomination needed
   */
  const calculateChange = (amountCharged: number, amountTendered: number) => {
    let changeOwed = amountTendered - amountCharged;
    let changeInDenominations: {[key: number]: number} = {};

    // For each denomination, calculate how many of that denomination are needed
    // and subtract that amount from the change owed
    DENOMINATIONS.forEach((denomination) => {
      changeInDenominations[denomination] = Math.floor(
        changeOwed / denomination
      );
      changeOwed %= denomination;
    });

    return changeInDenominations;
  };

  /**
   * fetchCatFact is an async function that fetches a cat fact from an API.
   * @returns A promise that resolves to a cat fact or an error message
   */
  const fetchCatFact = async () => {
    try {
      const response = await fetch(CAT_FACTS_API);
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error(error);
      return FETCH_ERROR_MESSAGE;
    }
  };

  /**
   * handleSubmit is a function that handles the form submission.
   * It calculates the change owed and fetches a cat fact if the change owed is exactly 0.
   * @param event - The form submission event
   */
  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    // Reset the message and change state variables
    setMessage("");
    setChange({});

    if (amountCharged && amountTendered) {
      let changeOwed = amountTendered - amountCharged;
      if (changeOwed < 0) {
        alert("We are sorry, but you did not pay enough.");
        return;
      }

      if (changeOwed === 0) {
        const message = await fetchCatFact();
        setMessage(message);
      }

      const changeInDenominations = calculateChange(
        amountCharged,
        amountTendered
      );
      setChange(changeInDenominations);
    }
  };

  return (
    <div>
      <form id="cash-calculator" onSubmit={handleSubmit}>
        <div className="cash-line">
          <label htmlFor="amountCharged">We need</label>
          <input
            id="amountCharged"
            name="amountCharged"
            type="number"
            aria-label="Amount Charged"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmountCharged(Number(e.target.value))
            }
          />
          <span className="cash-line-note">Mewla</span>
        </div>
        <div className="cash-line">
          <label htmlFor="amountTendered">You pay</label>
          <input
            id="amountTendered"
            name="amountTendered"
            type="number"
            aria-label="Amount Tendered"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmountTendered(Number(e.target.value))
            }
          />
          <span className="cash-line-note">Mewla</span>
        </div>
        <button id="calculate" type="submit">
          Calculate Change
        </button>
      </form>

      {Object.keys(change).length > 0 && (
        <div id="results">
          <ChangeOwed change={change} message={message} />
        </div>
      )}
    </div>
  );
}

export default MewlaConverter;
