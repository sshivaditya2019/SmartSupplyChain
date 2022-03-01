/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import '../styles/tailwind.css';
import '../styles/output.css';

export default function Bar() {
  return (
    <div className="flex flex-row p-1 space-x-1 realtive md:fixed">
      <div className="w-5 h-5 bg-red-600 rounded-full">
        <button
          onClick={() => {
            window.electron.ipcRenderer.close();
          }}
          className="bg-red-600 hover:bg-red-800 rounded-full w-5 h-5"
        >
          &nbsp; &nbsp; &nbsp;
        </button>
      </div>
      <div className="w-5 h-5 bg-yellow-600 rounded-full">
        <button
          onClick={() => {
            window.electron.ipcRenderer.min();
          }}
          className="bg-yellow-600 hover:bg-yellow-800 rounded-full w-5 h-5"
        >
          &nbsp; &nbsp; &nbsp;
        </button>
      </div>
      <div className="w-5 h-5 bg-green-600 rounded-full">
        <button
          onClick={() => {
            window.electron.ipcRenderer.max();
          }}
          className="bg-green-600 hover:bg-green-800 rounded-full w-5 h-5"
        >
          &nbsp; &nbsp; &nbsp;
        </button>
      </div>
    </div>
  );
}
