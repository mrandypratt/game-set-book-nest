import { Navbar, ParkCard, SearchBar } from "../components";
import { apiClient, ParkDto } from "../api";
import { useEffect, useState } from "react";

export const SearchParksView = () => {
  const [allParks, setAllParks] = useState<ParkDto[]>([]);
  const [parksToDisplay, setParksToDisplay] = useState<ParkDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await apiClient.park.parkControllerGetAllParks();
        const { data: fetchedParks, status } = response;
        if (status !== 200) {
          throw new Error("Failed to fetch parks");
        }
        setAllParks(fetchedParks);
        setParksToDisplay(fetchedParks);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchParks();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  useEffect(() => {
    if (!searchValue) {
      setParksToDisplay(allParks);
    } else {
      const filteredParks = allParks.filter((park) => {
        return (
          park.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          park.city.toLowerCase().includes(searchValue.toLowerCase())
        );
      });

      setParksToDisplay(filteredParks);
    }
  }, [searchValue, allParks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content-container">
        <SearchBar setSearchValue={setSearchValue} />
        {parksToDisplay?.length ? (
          parksToDisplay.map((park) => {
            return <ParkCard key={park.id} park={park} />;
          })
        ) : (
          <h1 style={{ color: "black" }}>No Parks Found</h1>
        )}
      </div>
    </div>
  );
};
