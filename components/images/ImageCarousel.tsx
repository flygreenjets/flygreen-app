import {Dimensions, FlatList, View} from "react-native";
import ImageCarouselItem from "@/components/images/ImageCarouselItem";
import {useState} from "react";
import DotPagination from "@/components/ui/DotPagination";
import {GestureHandlerRootView} from "react-native-gesture-handler";

interface ImageCarouselProps {
    data: any[];
}

const {height} = Dimensions.get('screen');

export default function ImageCarousel({data}: ImageCarouselProps) {
    const [pagination, setPagination] = useState(0);
    return (
        <GestureHandlerRootView style={{
            height: height * 0.4,
            width: '100%',
            position: 'relative',
            zIndex: 0,
            overflow: 'visible',
        }}>
            <FlatList
                style={{zIndex: 1, overflow: 'visible'}}
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
            <View>
                <DotPagination activeDotColor="white" inactiveDotColor="gray" items={data} paginationIndex={pagination}/>
            </View>
        </GestureHandlerRootView>
    );
}