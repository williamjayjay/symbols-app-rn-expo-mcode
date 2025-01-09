import * as React from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { ThemedText } from "@/components/ThemedText";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import {
  AnimationType,
  SFSymbol,
  SymbolView,
  SymbolViewProps,
} from "expo-symbols";
import { StyleSheet, Switch, View } from "react-native";

export default function SymbolLab() {
  const route = useRoute<RouteProp<{ params: { symbol: SFSymbol } }>>();
  const [tintColor, setTintColor] = React.useState("");
  const [selectedWeight, setSelectedWeight] = React.useState("unspecified");
  const [selectedVariant, setSelectedVariant] = React.useState("monochrome");
  const [selectedDirection, setSelectedDirection] = React.useState("up");
  const [repeatAnimation, setRepeatAnimation] = React.useState(false);
  const [selectedAnimation, setSelectedAnimation] =
    React.useState("unspecified");
  const weights = [
    "black",
    "heavy",
    "bold",
    "medium",
    "light",
    "thin",
    "ultraLight",
  ];

  const types: SymbolViewProps["type"][] = [
    "monochrome",
    "hierarchical",
    "multicolor",
    "palette",
  ];

  return (
    <>
      <Stack.Screen options={{ headerTitle: route.params.symbol }} />
      <View style={styles.container}>
        <SymbolView
          name={route.params.symbol}
          size={250}
          style={styles.symbol}
          weight={selectedWeight as SymbolViewProps["weight"]}
          type={selectedVariant as SymbolViewProps["type"]}
          tintColor={selectedVariant === "palette" ? null : tintColor}
          colors={["#22c55e", "#ec4899"]}
          animationSpec={
            selectedAnimation === "none"
              ? {}
              : {
                  effect: {
                    type: selectedAnimation as AnimationType,
                    direction: selectedDirection as "up" | "down",
                    // wholeSymbol: true,
                  },
                  repeating: repeatAnimation,
                }
          }
        />
        <>
          <ThemedText type="defaultSemiBold">Weight</ThemedText>
          <SegmentedControl
            values={weights}
            selectedIndex={weights.length - 1}
            onChange={(event) => setSelectedWeight(event.nativeEvent.value)}
          />
        </>
        <>
          <ThemedText type="defaultSemiBold">Variant</ThemedText>
          <SegmentedControl
            values={types as any}
            selectedIndex={0}
            onChange={(event) => setSelectedVariant(event.nativeEvent.value)}
          />
          {/* <ThemedText style={{ fontSize: 12 }}>
            Palette will use colors prop
          </ThemedText> */}
        </>
        <>
          <ThemedText type="defaultSemiBold">Tint Color</ThemedText>
          <SegmentedControl
            values={["orange", "#3b82f6", "#22c55e", "#ec4899", "#fff"]}
            selectedIndex={0}
            onChange={(event) => setTintColor(event.nativeEvent.value)}
          />
        </>
        <>
          <ThemedText type="defaultSemiBold">Animation</ThemedText>
          <SegmentedControl
            values={["bounce", "pulse", "scale", "none"]}
            selectedIndex={3}
            onChange={(event) => setSelectedAnimation(event.nativeEvent.value)}
          />
        </>
        {selectedAnimation === "scale" && (
          <>
            <ThemedText type="defaultSemiBold">Scale direction</ThemedText>
            <SegmentedControl
              values={["up", "down"]}
              selectedIndex={0}
              onChange={(event) =>
                setSelectedDirection(event.nativeEvent.value)
              }
            />
          </>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="defaultSemiBold">Repeat</ThemedText>
          <Switch
            onChange={() => setRepeatAnimation(!repeatAnimation)}
            value={repeatAnimation}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  symbol: {
    alignSelf: "center",
  },
});
