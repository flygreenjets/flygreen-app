import {StyleSheet, Text, View} from "react-native";
import QuoteCard from "@/components/quotes/QuoteCard";
import {Quote} from "@/types/trips";

interface QuoteSectionProps {
    quotes: Quote[];
    tripId: number;
}

export default function QuoteSection({quotes, tripId}: QuoteSectionProps) {
    return (
        <View style={styles.quoteScroll}>
            <Text style={styles.itineraryTitle}>Quotes</Text>
            {quotes.sort((a, b) => {
                const isARecommended = a.quoteFlag?.label === "Recommended";
                const isBRecommended = b.quoteFlag?.label === "Recommended";

                if (isARecommended === isBRecommended) return 0;
                return isARecommended ? -1 : 1;
            }).map((quote: Quote) => {
                return <QuoteCard tripId={tripId} key={quote.id} quote={quote} flag={quote.quoteFlag}/>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    itineraryTitle: {
        marginBottom: 10,
        fontSize: 20,
    },
    quoteScroll: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});