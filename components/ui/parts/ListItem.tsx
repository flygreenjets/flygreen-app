import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from "@/utils/Colors";
import {formatDistanceStrict} from "date-fns";

interface ListItemProps{
    title?: string;
    description?: string;
    date?: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    onPress?: () => void;
    borderBottom?: boolean;
    style?: object | null;
}

export default function ListItem({title, description, date, icon, children, onPress, borderBottom, style}: ListItemProps) {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.notificationContainer, borderBottom && {
                borderBottomColor: Colors.lightGray,
                borderBottomWidth: 0.5,
            }, style]}>
                <View>
                    {icon}
                </View>
                <View>
                    {children ? (
                        children
                    ) : (
                      <>
                          <View style={styles.titleContainer}>
                              {title && (
                                  <Text>{title}</Text>
                              )}
                              {date && (
                                  <>
                                      <Text>•</Text>
                                      <Text style={{color: "#888"}}>
                                          {
                                              formatDistanceStrict(new Date(date), new Date(), {
                                                  addSuffix: true,
                                              })
                                          }
                                      </Text>
                                  </>
                              )}
                          </View>
                          {description && (
                              <Text>{description}</Text>
                          )}
                      </>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    notificationContainer: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 17,
        gap: 10,
        backgroundColor: Colors.white,
        alignItems: "center",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 5
    },
})