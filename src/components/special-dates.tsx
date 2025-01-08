"use client"


export default function SpecialDates(){
    return(
        <div className="flex flex-col flex-1 h-[calc(100vh-24rem)]">
            <div className="flex-1 grid grid-cols-2 gap-4 px-8">
            
                <OurDate eventName="Mêsversário" eventDate="2025-02-07" />
            

                <OurDate eventName="1 ano de namoro" eventDate="2025-09-07"/>

            </div>
        </div>
    )
}

interface OurDateProps {
    eventName: string;
    eventDate: string;  
  }

function OurDate({eventName, eventDate}: OurDateProps){

    const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return new Date(date).toLocaleDateString("en-US", options);
    };
    
    function handleClick(){
        console.log("CountDown started")
    }

    return(
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">

            <h2 className="text-xl font-semibold text-white mb-2">{eventName}</h2>

            <p className="text-white/90 mb-2">{formatDate(eventDate)}</p>

            <button onClick={handleClick} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Start Countdown
            </button>    

        </div>
    )
}