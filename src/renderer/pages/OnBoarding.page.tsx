/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable global-require */
/* eslint-disable react/button-has-type */
import '../styles/tailwind.css';
import '../styles/output.css';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';

import ea from '../../../assets/illustrations/ea.svg';
import Bar from '../components/Bar.component';

function OnBoardingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col overflow-hidden">
      <Bar />
      <div className="flex flex-row content-center pl-6 pr-6 gap-10 h-screen w-screen ">
        <div
          id="textCo"
          className="grid grid-cols-1 gap-3 min-h-screen place-content-center pl-6 pr-6"
        >
          <h1 className="font-['OPTITriplettBoldAgency'] font-bold text-6xl">
            Supply Chain,
            <br />
            Redifined
          </h1>
          <button href="electron-playground://hello">Click</button>
          <button
            className="flex-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => navigate('login')}
          >
            Explore
          </button>
        </div>
        <div
          id="imageCo"
          className="grid grid-cols-1 gap-3 place-content-center grow"
        >
          <img alt="ea" src={ea} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default OnBoardingPage;
