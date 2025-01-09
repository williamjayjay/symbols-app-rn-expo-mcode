import { Link, Stack } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { symbolsDB } from "@/symbolsDB";
import { useMemo, useState } from "react";
import SymbolItem from "@/components/SymbolItem";

export default function NotFoundScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredSymbols = useMemo(() => {
    return symbolsDB
      .slice(0, 500)
      .filter((symbol) =>
        symbol.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, symbolsDB]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Symbols Lab ✈️ ",
          headerSearchBarOptions: {
            onChangeText: (event) => {
              setSearchText(event.nativeEvent.text);
            },
          },
        }}
      />
      <SafeAreaView>
        <FlatList
          data={filteredSymbols}
          renderItem={({ index, item }) => (
            <SymbolItem key={index} symbol={item} />
          )}
          numColumns={9}
          contentContainerStyle={{
            padding: 16,
            gap: 16,
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
