import {FlatList, View} from "react-native";
import ImageCarouselItem from "@/components/images/ImageCarouselItem";
import {useState} from "react";
import DotPagination from "@/components/ui/DotPagination";

interface ImageCarouselProps {
    data: any[];
}

export default function ImageCarousel({data}: ImageCarouselProps) {
    const [pagination, setPagination] = useState(0);
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({item, index}) => <ImageCarouselItem item={item} index={index}/>}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onViewableItemsChanged={({changed, viewableItems}) => {
                    if (changed.length > 0) {
                        setPagination(viewableItems[0].index || 0);
                    }
                }}
            />
            <View style={{flex: 1, marginTop: 20}}>
                <DotPagination items={data} paginationIndex={pagination}/>
            </View>
        </View>
    );
}