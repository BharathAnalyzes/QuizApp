import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import React, { useState } from 'react'
import StartScreen from './components/StartScreen';
import EasyQuestion from './components/EasyQuestion';
import MediumQuestion from "./components/MediumQuestion";
import HardQuestion from "./components/HardQuestion";
import questionContext  from './MockData/context';
const App = () => {
  const [score, setTotalScore] = useState(0);
  const approuter=createBrowserRouter([
    {
      path: "/",
      element :<StartScreen/>
    },
    {
      path: "/easyquestion",
      element :<EasyQuestion/>
    },
    {
      path: "/mediumquestion",
      element :<MediumQuestion/>
    },
    {
      path: "/hardquestion",
      element :<HardQuestion/>
    },
  ]);
   return (
    <questionContext.Provider value={{ totalScore:score, setTotalScore }}>
      <RouterProvider router={approuter} />
    </questionContext.Provider>
  );
}

export default App

