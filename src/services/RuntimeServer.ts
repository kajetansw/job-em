import { Layer, ManagedRuntime } from "effect";
import { SupabaseService } from "./SupabaseService";

const MainLayer = Layer.mergeAll(SupabaseService.Default);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
