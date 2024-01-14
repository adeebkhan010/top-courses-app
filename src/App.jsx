import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import { filterData, apiUrl } from './data'
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const output = await res.json();
      setCourses(output.data);
    } catch (error) {
      toast.error("Something went wrong :(");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div>
        <Filter filterData={filterData} category={category} setCategory={setCategory} />
      </div>
      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h[50vh]">
        {
          loading ? (<Spinner />) : (<Cards courses={courses} category={category} />)
        }
      </div>
    </div>
  );
}

export default App;
