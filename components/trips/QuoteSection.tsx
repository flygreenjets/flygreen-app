import {StyleSheet, Text, View} from "react-native";
import QuoteCard from "@/components/quotes/QuoteCard";
import {Quote} from "@/types/trips";

interface QuoteSectionProps {
    quotes: Quote[];
}

export default function QuoteSection({quotes}: QuoteSectionProps) {
    return (
        <View style={styles.quoteScroll}>
            <Text style={styles.itineraryTitle}>Quotes</Text>
            {quotes.map((quote: Quote) => {
                return <QuoteCard key={quote.id} quote={quote} flag={quote.quoteFlag}/>
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