"use client";

import React, { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { CiViewTable } from "react-icons/ci";
import { VscJson } from "react-icons/vsc";

// Type value yang dipakai context
export type ResponseTypeValue = "TABLE" | "JSON";

// State type
interface State {
  dataType: ResponseTypeValue;
}

// Action type
type Action = { type: "SET_RESPONSE_TYPE"; payload: ResponseTypeValue };

// Initial state
const initialState: State = {
  dataType: "TABLE",
};

// Reducer function
function responseTypeReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RESPONSE_TYPE":
      return { ...state, dataType: action.payload };
    default:
      return state;
  }
}

// Context types
interface ResponseTypeContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

// Create context
const ResponseTypeContext = createContext<ResponseTypeContextProps | undefined>(undefined);

// Provider component
export const ResponseTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(responseTypeReducer, initialState);

  return <ResponseTypeContext.Provider value={{ state, dispatch }}>{children}</ResponseTypeContext.Provider>;
};

// Custom hook buat akses context
export function useResponseType() {
  const context = useContext(ResponseTypeContext);
  if (!context) {
    throw new Error("useResponseType must be used within a ResponseTypeProvider");
  }
  return context;
}

export default function ResponseTypeSwitch() {
  const { state, dispatch } = useResponseType();

  const handleTableClick = () => dispatch({ type: "SET_RESPONSE_TYPE", payload: "TABLE" });
  const handleJsonClick = () => dispatch({ type: "SET_RESPONSE_TYPE", payload: "JSON" });

  return (
    <div className="relative flex rounded-md border border-gray-300 items-center p-1 w-fit  bg-gray-100 overflow-hidden">
      {/* Background slider */}
      <div
        className={cn(
          "absolute left-1 w-8 h-8 bg-primary rounded-md transition-transform duration-300 ease-in-out",
          state.dataType === "TABLE" ? "translate-x-0" : "translate-x-full"
        )}
      />

      {/* Table Button */}
      <button
        onClick={handleTableClick}
        className={cn(
          "relative z-10 w-8 h-8 flex justify-center items-center text-xl transition-colors duration-150",
          state.dataType === "TABLE" ? "text-white" : "text-gray-600 hover:text-primary cursor-pointer"
        )}
        aria-label="Table View"
      >
        <CiViewTable />
      </button>

      {/* JSON Button */}
      <button
        onClick={handleJsonClick}
        className={cn(
          "relative z-10 w-8 h-8 flex justify-center items-center text-xl transition-colors duration-150",
          state.dataType === "JSON" ? "text-white" : "text-gray-600 hover:text-primary cursor-pointer"
        )}
        aria-label="JSON View"
      >
        <VscJson />
      </button>
    </div>
  );
}
