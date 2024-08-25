import Display from "./components/calc-display";
import Pad from "./components/calc-pad";
import { Digit, Operator } from "./common/types";
import { useState } from "react";

// const StyledApp = styled.div`
//   font-size: 16px;
//   width: 100%;
//   max-width: 320px;
// `;

type CalculatorProps = {
  getResult: (value: number) => void;
};

export const CalculatorApp: React.FC<CalculatorProps> = ({ getResult }) => {
  const [memory, setMemory] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
  const [pendingOperator, setPendingOperator] = useState<Operator>();
  const [display, setDisplay] = useState<string>("0");

  const calculate = (
    rightOperand: number,
    pendingOperator: Operator
  ): boolean => {
    let newResult = result;

    switch (pendingOperator) {
      case "+":
        newResult += rightOperand;
        break;
      case "-":
        newResult -= rightOperand;
        break;
      case "×":
        newResult *= rightOperand;
        break;
      case "÷":
        if (rightOperand === 0) {
          return false;
        }

        newResult /= rightOperand;
    }

    setResult(newResult);
    setDisplay(newResult.toString().toString().slice(0, 12));

    return true;
  };

  // // Pad buttons handlers
  const onDigitButtonClick = (digit: Digit) => {
    let newDisplay = display;

    if ((display === "0" && digit === 0) || display.length > 12) {
      return;
    }

    if (waitingForOperand) {
      newDisplay = "";
      setWaitingForOperand(false);
    }

    if (display !== "0") {
      newDisplay = newDisplay + digit.toString();
    } else {
      newDisplay = digit.toString();
    }

    setDisplay(newDisplay);
  };

  const onPointButtonClick = () => {
    let newDisplay = display;

    if (waitingForOperand) {
      newDisplay = "0";
    }

    if (newDisplay.indexOf(".") === -1) {
      newDisplay = newDisplay + ".";
    }

    setDisplay(newDisplay);
    setWaitingForOperand(false);
  };

  const onOperatorButtonClick = (operator: Operator) => {
    const operand = Number(display);

    if (typeof pendingOperator !== "undefined" && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }
    } else {
      setResult(operand);
    }

    setPendingOperator(operator);
    setWaitingForOperand(true);
  };

  const onChangeSignButtonClick = () => {
    const value = Number(display);

    if (value > 0) {
      setDisplay("-" + display);
    } else if (value < 0) {
      setDisplay(display.slice(1));
    }
  };

  const onEqualButtonClick = () => {
    const operand = Number(display);

    if (typeof pendingOperator !== "undefined" && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }

      setPendingOperator(undefined);
    } else {
      setDisplay(operand.toString());
    }

    setResult(operand);
    setWaitingForOperand(true);
  };

  const onAllClearButtonClick = () => {
    setMemory(0);
    setResult(0);
    setPendingOperator(undefined);
    setDisplay("0");
    setWaitingForOperand(true);
  };

  const onClearEntryButtonClick = () => {
    setDisplay("0");
    setWaitingForOperand(true);
  };

  const onMemoryRecallButtonClick = () => {
    setDisplay(memory.toString());
    setWaitingForOperand(true);
  };

  const onMemoryClearButtonClick = () => {
    setMemory(0);
    setWaitingForOperand(true);
  };

  const onMemoryPlusButtonClick = () => {
    setMemory(memory + Number(display));
    setWaitingForOperand(true);
  };

  const onMemoryMinusButtonClick = () => {
    setMemory(memory - Number(display));
    setWaitingForOperand(true);
  };
  const onGetMemory = () => getResult(result);

  return (
    <div>
      
      <Display
        value={display}
        hasMemory={memory !== 0}
        expression={
          typeof pendingOperator !== "undefined"
            ? `${result}${pendingOperator}${waitingForOperand ? "" : display}`
            : ""
        }
      />
      <Pad
        onDigitButtonClick={onDigitButtonClick}
        onPointButtonClick={onPointButtonClick}
        onOperatorButtonClick={onOperatorButtonClick}
        onChangeSignButtonClick={onChangeSignButtonClick}
        onEqualButtonClick={onEqualButtonClick}
        onAllClearButtonClick={onAllClearButtonClick}
        onClearEntryButtonClick={onClearEntryButtonClick}
        onMemoryRecallButtonClick={onMemoryRecallButtonClick}
        onMemoryClearButtonClick={onMemoryClearButtonClick}
        onMemoryPlusButtonClick={onMemoryPlusButtonClick}
        onMemoryMinusButtonClick={onMemoryMinusButtonClick}
        onGetMemory={onGetMemory}
      />
    </div>
  );
};

export default CalculatorApp;
