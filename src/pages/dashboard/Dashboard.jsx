import "./Dashboard.css";
import { useCollection } from "../../hooks/UseCollection";
import Projectlist from "../../components/Projectlist";
import Projectfilter from "./Projectfilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
const Dashboard = () => {
  const [currentfilter, setcurrentfilter] = useState("hepsi");
  const changefilter = (newfilter) => {
    setcurrentfilter(newfilter);
  };
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projeler");
  const projects = documents
    ? documents.filter((doc) => {
        switch (currentfilter) {
          case "hepsi":
            return true;
          case "benim":
            let kendiprojelerim = false;
            doc.projekullanicilistesi.forEach((k) => {
              if (k.id === user.uid) {
                kendiprojelerim = true;
              }
            });
            return kendiprojelerim;
          case "masaüstü":
          case "web":
          case "mobil":
            return doc.kategori == currentfilter;
          default:
            return;
        }
      })
    : null;
 
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <Projectfilter
          currentfilter={currentfilter}
          changefilter={changefilter}
        />
      )}
      {documents && <Projectlist projeler={projects} />}
    </div>
  );
};

export default Dashboard;
