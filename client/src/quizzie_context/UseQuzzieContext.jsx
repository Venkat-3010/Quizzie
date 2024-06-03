import { useContext, useState } from "react";

const QuizzieContextValues = () => {
    const [mobileView, setMobileView] = useState(window.innerWidth < 750);
    const [selectedItem, setSelectedItem] = useState("Dashboard")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return{
        mobileView,
        setMobileView,
        selectedItem,
        setSelectedItem,
        isLoggedIn,
        setIsLoggedIn,
    }
};

const UseQuizzieContext = () => useContext(QuizzieContextValues)

export { UseQuizzieContext, QuizzieContextValues }; 