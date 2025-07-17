import {View, ScrollView, Text, StyleSheet} from "react-native";
import {Quote, Trip} from "@/types/trips";
import TripCard from "@/components/trips/TripCard";
import {Colors} from "@/utils/Colors";
import QuoteSection from "@/components/trips/QuoteSection";
import TripSheetSection from "@/components/trips/trip-sheets/TripSheetSection";
import TripReportSection from "@/components/trips/trip-reports/TripReportSection";

interface TripViewProps {
    trip: Trip
}

// const data: Quote[] = [
//     {
//         id: "1",
//         imageUrl: "https://flygreen.s3.us-east-2.amazonaws.com/aircraft-category-pictures/supermidsize-exterior.jpg",
//         aircraft: {
//             category: "Super Midsize Jet",
//             model: "Citation X",
//             seats: 8,
//             cabinHeight: "5'9\"",
//             yom: "2001",
//             yor: "2018",
//         },
//         departureDate: "Dec 23 2024",
//         departureAirport: {
//             code: "CYUL",
//             name: "Montreal Airport",
//         },
//         destinationAirport: {
//             code: "KTEB",
//             name: "Teterboro Airport",
//         },
//         pax: 1,
//         duration: "98",
//         fuelStops: 1,
//         quoteFlag: {
//             label: "Recommended",
//             color: Colors.flygreenGreen,
//         },
//         price: 31030,
//         segments: {
//             departure: {
//                 airport: {
//                     code: "CYUL",
//                     name: "Montreal Airport",
//                 },
//                 date: "Dec 23 2024",
//                 time: "10:00 AM",
//             },
//             arrival: {
//                 airport: {
//                     code: "KTEB",
//                     name: "Teterboro Airport",
//                 },
//                 date: "Dec 23 2024",
//                 time: "12:38 PM",
//             },
//             flightTime: "2h 38m",
//             fuelStops: 1,
//         }
//     },
//     {
//         id: "2",
//         departureDate: "Dec 23 2024",
//         imageUrl: "https://flygreen.s3.us-east-2.amazonaws.com/aircraft-category-pictures/midsize-exterior.png",
//         aircraft: {
//             category: "Super Midsize Jet",
//             model: "Citation X",
//             seats: 8,
//             cabinHeight: "4'11\"",
//             yom: "2023",
//             yor: "2024"
//         },
//         notes: "Pricing is subject to: continued aircraft availability at time of booking.\n" +
//             "YOM: 2011-2017\n" +
//             "YOR: 2019-2021\n" +
//             "Nonstop Option\n" +
//             "Catering Included\n" +
//             "Free International Wifi",
//         departureAirport: {
//             code: "CYHU",
//             name: "Montreal Airport",
//         },
//         destinationAirport: {
//             code: "KLAX",
//             name: "Teterboro Airport",
//         },
//         pax: 1,
//         duration: "98",
//         fuelStops: 1,
//         quoteFlag: {
//             label: "Different Routing",
//             color: "#ff3131",
//         },
//         price: 26239,
//         segments: {
//             departure: {
//                 airport: {
//                     code: "CYUL",
//                     name: "Montreal Airport",
//                 },
//                 date: "Dec 23 2024",
//                 time: "10:00 AM",
//             },
//             arrival: {
//                 airport: {
//                     code: "KTEB",
//                     name: "Teterboro Airport",
//                 },
//                 date: "Dec 23 2024",
//                 time: "12:38 PM",
//             },
//             flightTime: "2h 38m",
//             fuelStops: 1,
//         }
//     },
//     {
//         id: "3",
//         imageUrl: "https://flygreen.s3.us-east-2.amazonaws.com/aircraft-category-pictures/turboprop-exterior.jpg",
//         departureDate: "Dec 23 2024",
//         aircraft: {
//             category: "Super Midsize Jet",
//             model: "Citation X",
//             seats: 8,
//             cabinHeight: "6'1\"",
//             yom: "1976",
//             yor: "2013"
//         },
//         departureAirport: {
//             code: "CYHU",
//             name: "Montreal Airport",
//         },
//         destinationAirport: {
//             code: "KLAX",
//             name: "Teterboro Airport",
//         },
//         pax: 1,
//         duration: "98",
//         fuelStops: 1,
//         price: 45226,
//         segments: {
//             departure: {
//                 airport: {
//                     code: "CYUL",
//                     name: "Montreal Airport",
//                 },
//                 date: "Dec 23 2024",
//                 time: "10:00 AM",
//             },
//             arrival: {
//                 airport: {
//                     code: "KTEB",
//                     name: "Teterboro Airport",
//                 },
//                 date: "Dec 23 2024",
//                 time: "12:38 PM",
//             },
//             flightTime: "2h 38m",
//             fuelStops: 1,
//         }
//     }
// ];

const data: Quote[] = [];
export default function TripView({trip}: TripViewProps) {
    return (
        <ScrollView>
            <View style={{
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}>
                <TripCard trip={trip} showAsCard={false}/>
            </View>
            {trip.stage === "Sourcing" &&
                data.length > 0 ? (
                    <QuoteSection quotes={data} />
                ) : (
                    <View>
                        <Text style={styles.banner}>
                            Pascal is currently sourcing quotes for this trip. Please check back later.
                        </Text>
                    </View>
                )
            }

            {trip.stage === "Closed Won" && (
                <>
                    <TripSheetSection />
                    <TripReportSection />
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: Colors.flygreenGreen,
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        marginHorizontal: 16,
        textAlign: "center",
        color: Colors.white,
    }
})