import React, { createContext, useContext } from "react"

import { ClassType } from "../../lib/api"
import { throwError } from "../../lib/utils"

const ClassTypeContext = createContext<ClassType | undefined>(undefined)

export function useClassTypeContext() {
  return useContext(ClassTypeContext) ?? throwError("No ClassTypeContext!")
}

export const ClassTypeProvider: React.FC<{ classType: ClassType }> = ({ classType, children }) => (
  <ClassTypeContext.Provider value={classType}>{children}</ClassTypeContext.Provider>
)