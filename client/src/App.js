import { Header } from "./components/assets/Header";
import { Principal } from "./components/principal/Principal";
import { LibroProvider } from "./context/LibroProvider";

function App() {
  // ------------------------------------------------------------------------------------ //
  return (
    <>
      <LibroProvider>
        <Header />
        <Principal />
      </LibroProvider>
    </>
  );
}

export default App;
