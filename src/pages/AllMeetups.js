import { useState, useEffect } from "react";

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadMeetup] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://meetup-page-e89db-default-rtdb.europe-west1.firebasedatabase.app/meetups.json',
        ).then(response => {
            return response.json();
        }).then( data => {
            const meetups = [];

            for (const key in data) {
                const meetup = {
                    id: key,
                    ...data[key]
                };

                meetups.push(meetup);
            }
            
            setIsLoading(false);
            setLoadMeetup(meetups);
        });        
    }, []); 
    
    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <h1>All Meetup</h1>
            <ul>
               <MeetupList meetups={loadedMeetups} />
            </ul>            
        </section>
    );
}

export default AllMeetupsPage; 