import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export default function SymbolItem({ symbol }: { symbol: SFSymbol }) {
  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.icon },
    "text"
  );
  return (
    <Link href={{ pathname: "/symbol-lab", params: { symbol } }} asChild>
      <TouchableOpacity>
        <SymbolView
          name={symbol}
          tintColor={color}
          size={30}
          style={{
            marginRight: 11,
            borderColor: "red",
          }}
          // fallback={<ThemedText>This is a fallback for Android</ThemedText>}
        />
      </TouchableOpacity>
    </Link>
  );
}
