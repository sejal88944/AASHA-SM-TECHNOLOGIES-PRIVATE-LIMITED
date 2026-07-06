import { createRoot } from "react-dom/client";
import "./bootstrap";
import "./styles/global.css";
import "./styles/testPortalTailwind.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
