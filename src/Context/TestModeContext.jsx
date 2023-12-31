const { createContext, useState, useContext } = require("react");


const TestModeContext = createContext();

export const TestModeCondextProvider = ({children}) => {
    
    const [testTime, setTestTime] = useState(15);

    const values = {
        testTime,
        setTestTime
    }

    return(<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export  const useTestMode = () => useContext(TestModeContext);