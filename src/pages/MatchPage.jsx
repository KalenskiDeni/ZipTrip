// Created by Magda
import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import "/src/styles/match.css";

// Icons
import location from "../assets/icons/location.svg";
import age from "../assets/icons/birthday.svg";
import interests from "../assets/icons/interests.svg";
import matchYES from "../assets/icons/match-YES.svg";
import matchNO from "../assets/icons/match-NO.svg";

// Functions
export default function MatchPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [ageRange, setAgeRange] = useState([18, 100]);
    const [filterAgeRange, setFilterAgeRange] = useState([18, 100]);
    const [activeFilter, setActiveFilter] = useState(null); // Track the active filter
    const [selectedInterests, setSelectedInterests] = useState([]); // Store selected interests
    const uniqueInterests = Array.from(new Set(data.flatMap(local => local.interests))); // Unique interests from locals

    
    // Fetching data from database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch( //waits until all the data is loaded to process it
                    "https://ziptrip-ec0b6-default-rtdb.firebaseio.com//locals.json"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(Object.values(result));
            } catch (err) { // if the error was found
                setError(err.message);
            } finally {
                setLoading(false); //finished loading of data
            }
        };

        fetchData();
    }, []);

    // Filters
    useEffect(() => { //useEffect - 'activates' the code whenver something changes , user use filter
        const applyFilter = () => {
            let filtered = data;

            if (selectedGenders.length > 0) { // if the user wants to filter then the code does its jobb
                filtered = filtered.filter(local => selectedGenders.includes(local.gender));
            }

            filtered = filtered.filter(local => local.age >= filterAgeRange[0] && local.age <= filterAgeRange[1]); // checks if the local is between the minimum 0 and the maximum 1 age that the use chose

            if (selectedInterests.length > 0) {
                filtered = filtered.filter(local => 
                    local.interests.some(interest => selectedInterests.includes(interest))
                );
            }

            setFilteredData(filtered);
            setCurrentIndex(0); //shows the first person grom the list that matches the filtered criteria
        };

        applyFilter(); //whenver any element below changes the useEffect will start again and put this function to work to automatically apply new filters
    }, [selectedGenders, filterAgeRange, selectedInterests, data]);

    // Gender
    const handleGenderChange = (gender) => {
        setSelectedGenders(prev => //prev is currently chosen genders
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender] //if the gender is already on the list then the code creates a new list without it (ofc if the users unclick the gender), if the gender is not on the list of chosen genders and the user clicks on it the code adds the gender to the list. It is so simple Idk why I am writing that much
        );
    };

    // Age Range
    const handleApplyAgeFilter = () => {
        setFilterAgeRange(ageRange);
        setActiveFilter(null); // Close the age dropdown after applying the filter
    };

    // Interets
    const handleInterestChange = (interest) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    // Accepting and rejecting people 
    const handleNext = (isAccepted) => {
        if (isAccepted) {
            console.log(`Accepted: ${filteredData[currentIndex].name}`); //
        } else {
            console.log(`Rejected: ${filteredData[currentIndex].name}`);
        }

        setCurrentIndex(prevIndex => prevIndex + 1); // after one action t 9accepting.rejecting) function comes to the next local on the list
    };

    // Making sure only one filter is open at the time, we dont like to have to many choices to make
    const toggleGenderDropdown = () => {
        setActiveFilter(activeFilter === 'gender' ? null : 'gender'); //if its active it will be put in null and closed
        if (activeFilter === 'age' || activeFilter === 'interests') {
            setActiveFilter('gender'); // if the other filter is active and the user clicks on the gender filter then the other one will be closed
        }
    };

    //same 
    const toggleAgeDropdown = () => {
        setActiveFilter(activeFilter === 'age' ? null : 'age');
        if (activeFilter === 'gender' || activeFilter === 'interests') {
            setActiveFilter('age');
        }
    };

    //same
    const toggleInterestsDropdown = () => {
        setActiveFilter(activeFilter === 'interests' ? null : 'interests');
        if (activeFilter === 'gender' || activeFilter === 'age') {
            setActiveFilter('interests');
        }
    };

    // Check if no locals match the filters or if all locals have been viewed
    const noLocalsMatchFilter = filteredData.length === 0;
    const allLocalsViewed = !noLocalsMatchFilter && currentIndex >= filteredData.length;

    return (
        <section className="page1">
            {!allLocalsViewed && ( //if it false then the code runs
                <div className="filter-section">
                    {/* Gender Filter Dropdown */}
                    <div className="filter-container">
                        <button
                            className="filter-button"
                            onClick={toggleGenderDropdown}
                        >
                            Gender
                        </button>

                        {activeFilter === 'gender' && (
                            <div className="dropdown-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedGenders.includes("female")}
                                        onChange={() => handleGenderChange("female")}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedGenders.includes("male")}
                                        onChange={() => handleGenderChange("male")}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedGenders.includes("other")}
                                        onChange={() => handleGenderChange("other")}
                                    />
                                    Other
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Age Filter Dropdown */}
                    <div className="filter-container">
                        <button
                            className="filter-button"
                            onClick={toggleAgeDropdown}
                        >
                            Age
                        </button>

                        {activeFilter === 'age' && (
                            <div className="age-range-dropdown">
                                <h5>Age Range: {ageRange[0]} - {ageRange[1]}</h5>
                                <div className="slider-container">
                                    <Range
                                        step={1}
                                        min={18}
                                        max={100}
                                        values={ageRange}
                                        onChange={(values) => setAgeRange(values)}
                                        renderTrack={({ props, children }) => ( //styling the track
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "6px",
                                                    width: "100%",
                                                    backgroundColor: "#ddd",
                                                    borderRadius: "4px",
                                                    position: "relative"
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => ( //styling those two things on the sides
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "20px",
                                                    width: "20px",
                                                    backgroundColor: "#333",
                                                    borderRadius: "50%"
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <button onClick={handleApplyAgeFilter} className="apply-filter-button">
                                    Apply Filter
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Interests Filter Dropdown */}
                    <div className="filter-container">
                        <button
                            className="filter-button"
                            onClick={toggleInterestsDropdown}
                        >
                            Activities
                        </button>

                        {activeFilter === 'interests' && (
                            <div className="dropdown-options">
                                {uniqueInterests.map((interest, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={selectedInterests.includes(interest)}
                                            onChange={() => handleInterestChange(interest)}
                                        />
                                        {interest}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="container1">
                {loading && <p>Loading...</p>} {/* it will show loading if its loading */}
                {error && <p>Error: {error}</p>} {/* it will show error if theres an erorr */}

                {!noLocalsMatchFilter && !allLocalsViewed ? ( //this will show if there are locals matching the crtieria
                    <div className="local-card"> 
                        <div className="avatar1-container">
                            <img
                                src={filteredData[currentIndex].avatar}
                                alt={`${filteredData[currentIndex].name}'s avatar`}
                                className="avatar1"
                            />
                        </div>
                        <h3>{filteredData[currentIndex].name}</h3>
                        <div className="info-row">
                            <div>
                                <img src={age} alt="age" className="iconM" />{" "}
                                {filteredData[currentIndex].age}
                            </div>
                            <div>
                                <img src={location} alt="Location" className="iconM" />
                                {filteredData[currentIndex].location}
                            </div>
                            <div>
                                <img src={interests} alt="interests" className="iconM" />{" "}
                                {filteredData[currentIndex].interests.join(", ")}
                            </div>
                        </div>
                        <p>{filteredData[currentIndex].about}</p>
                    </div>
                ) : ( //this will show if there are no locals matching the crtieria or available
                    <p>
                        {noLocalsMatchFilter
                            ? "No locals available with the matching filter"
                            : "No more locals available"}
                    </p>
                )}

                {!allLocalsViewed && currentIndex < filteredData.length && ( //it will show options to scroll if all the locals weren viewed and if there is still someone considering filtered data
                    <div className="button-container">
                        <button onClick={() => handleNext(false)} className="yes">
                            <img src={matchNO} alt="NO" className="iconY" />
                        </button>
                        <button onClick={() => handleNext(true)} className="yes">
                            <img src={matchYES} alt="YES" className="iconY" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
