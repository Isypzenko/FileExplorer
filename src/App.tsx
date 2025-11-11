import { Describe } from "./components/Describe";
import { useState } from "react";
import { MainLayout } from "./components/MainLayout";

function App() {
  const [started, setStarted] = useState(false);
  return started ? (
    <MainLayout />
  ) : (
    <Describe onStart={() => setStarted(true)} />
  );
}

export default App;
