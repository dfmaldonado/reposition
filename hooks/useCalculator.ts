import { useState } from "react";
import { useHistoryStore } from "./useStore";

const useCalculator = () => {
    const [value, setValue] = useState("");
    const [operation, setOperation] = useState<(number | string)[]>([]);
    const [resultToShow, setResultToShow] = useState<(number | string)[]>();
    const [error, setError] = useState("");
    const addToHistory = useHistoryStore((state) => state.addToHistory);

    const setOperationValue = (number: number | string) => {
        setValue(prevValue => {
            const strNumber = number.toString();
            
            if (["+", "-", "*", "/", "^"].includes(prevValue)) {
                 return strNumber === "." ? "0." : strNumber;
            }
            if (strNumber === ".") {
                if (prevValue.includes(".")) return prevValue; 
                if (prevValue === "" || prevValue === "0") return "0.";
                return `${prevValue}.`;
            }

            if (prevValue === "0" && strNumber !== ".") {
                return strNumber;
            }

            return `${prevValue}${strNumber}`;
        });
    };

    const deleteOperation = () => {
        setOperation([]);
        setValue("");
        setResultToShow([]);
        setError("");
    };

    const calculateOperation = () => {
        const realValues = operation.filter(item => item !== " ") as string[];
        const operadores = ["/", "*", "+", "-", "^"];
        
        console.log("Procesando:", realValues);

        // Validación básica
        const numeros = realValues.filter(item => !isNaN(Number(item)));
        const tieneOperador = realValues.some(item => operadores.includes(item));

        if (numeros.length >= 2 && !tieneOperador) {
            setError("Falta un operador.");
            return;
        }

        let calculoArray = [...realValues];
        let i = 0;

        // Bucle principal de resolución RPN
        while (i < calculoArray.length) {
            const token = calculoArray[i];

            if (operadores.includes(token)) {
                if (i < 2) {
                    setError("Formato RPN inválido");
                    return;
                }

                const num1 = Number(calculoArray[i - 2]);
                const num2 = Number(calculoArray[i - 1]);
                let result = 0;

                switch (token) {
                    case "+": result = num1 + num2; break;
                    case "-": result = num1 - num2; break;
                    case "*": result = num1 * num2; break;
                    case "^": result = Math.pow(num1, num2); break;
                    case "/":
                        if (num2 === 0) {
                            setError("No divisible por 0");
                            return;
                        }
                        result = num1 / num2;
                        break;
                }

                calculoArray.splice(i - 2, 3, result.toString());
                i = 0; 
            } else {
                i++;
            }
        }

        const resultString = calculoArray[0];
        
        if(resultString && !isNaN(Number(resultString))) {
            const historyItem = {
                id: Date.now().toString(), 
                operation: operation.join(' '),
                result: resultString,
                date: new Date().toISOString()
            };
            addToHistory(historyItem);
            setResultToShow(calculoArray);
        } else {
            setError("Error en cálculo");
        }
    };

    const enterValue = () => {
        if (resultToShow?.length) {
            setOperation(resultToShow);
            setResultToShow([]);
        }
        if (value === "") return; 

        setOperation(prev => [...prev, value]);
        setValue("");
    };

    const deleteLast = () => {
        setValue(prev => prev.slice(0, -1));
    };

    return {
        operation,
        value,
        setValue,
        setOperationValue,
        deleteOperation,
        calculateOperation,
        enterValue,
        deleteLast,
        error,
        resultToShow
    };
};

export default useCalculator;