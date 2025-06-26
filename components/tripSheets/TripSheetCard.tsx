import {Text} from 'react-native';
import Card from "@/components/ui/Card";

export default function TripSheetCard() {
    return (
        <Card style={{marginHorizontal: 5, marginVertical: 5}}>
            <Text className="text-xl font-semibold mb-2">Trip Sheet</Text>
            <Text className="text-gray-600">This is a placeholder for the Trip Sheet section.</Text>
        </Card>
    );
}