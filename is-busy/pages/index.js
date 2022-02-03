import { useEffect, useState } from "react";
// import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import dateFormat from "dateformat";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { db } from "../firebase";
// import gator from "../public/gator.png";

export default function Home() {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const libraryCollectionRef = collection(db, "library");

  useEffect(() => {
    const getLibrary = async () => {
      const data = await getDocs(libraryCollectionRef);
      setLibraries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getLibrary();
  }, []);

  if (loading || libraries.length === 0) {
    return null;
  }

  return (
    <>
      <nav className="flex items-center justify-between bg-blue-500 p-4 text-2xl text-white font-semibold">
        Is-Busy? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        {/* Do not ask */}
        <img src={"https://firebasestorage.googleapis.com/v0/b/is-busy.appspot.com/o/gator.png?alt=media&token=4c0596c5-c585-44e1-9161-4b0568d05f2b"} width={240 / 2} height={159 / 2} />
      </nav>
      <div className="flex items-center min-w-max justify-between p-4 bg-gray-200">
        <h1>Location</h1>
        <h1>Number Of People</h1>
        <h1>Last Updated</h1>
      </div>
      <Library libraries={Array(mostRecent(libraries))} arrLib={libraries} />
    </>
  );
}

const Library = ({ libraries, arrLib }) => {
  const timeInterval = 10;

  return libraries.map((library) => (
    <>
      <div
        key={library.id}
        className="flex items-center min-w-max justify-between p-4"
      >
        <h2>{library.name}</h2>
        <h2>{library.numberOfPeople}</h2>
        <h2>{dateFormat(library.lastChecked.toDate(), "mmm dS, h:MM TT")}</h2>
      </div>
      <hr></hr>
      <div className="flex items-center justify-center">
        <Line
          data={{
            labels: nMostRecent(library.name, arrLib, timeInterval).map(
              (x) => x.time
            ),
            datasets: [
              {
                label: "Number of People",
                data: nMostRecent(library.name, arrLib, timeInterval).map(
                  (x) => x.numberOfPeople
                ),
                borderColor: "rgb(175, 12, 192)",
                tension: 0.3,
                fill: true,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  ));
};

const mostRecent = (places) => {
  if (places.length === 0) {
    return null;
  }

  let recent = places[0];

  for (let i = 0; i < places.length; i++) {
    if (places[i].lastChecked > recent.lastChecked) {
      recent = places[i];
    }
  }

  return recent;
};

const nMostRecent = (place, places, n) => {
  if (places.length === 0) {
    return null;
  }

  places.sort((a, b) => (a.lastChecked > b.lastChecked ? -1 : 1));

  let ret = [];
  for (let i = 0; i < n; i++) {
    if (places[i] && places[i].name === place) {
      ret.push({
        time: dateFormat(places[i].lastChecked.toDate(), "h:MM TT"),
        numberOfPeople: places[i].numberOfPeople,
      });
    }
  }

  return ret.reverse();
};
