"use client"


export default function SpecialDates(){
    return(
        <div className="flex flex-col flex-1 h-[calc(100vh-24rem)]">
            <div className="flex flex-col justify-center sm:flex-row gap-4 flex-1  ">
            
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
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center">

            <h2 className="text-xl font-semibold text-white mb-2">{eventName}</h2>

            <p className="text-white/90 mb-2">{formatDate(eventDate)}</p>

            <button onClick={handleClick} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Start Countdown
            </button>    

        </div>
    )
}