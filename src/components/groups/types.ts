import type {Signal} from "../signals/types.ts";

export type Group = {
    id?: number;
    name: string;
    fullPath: string;
    properties: Record<string, unknown>;
    datatype: string;
    child_groups?: Array<Group>;
    signals?: Array<Signal>;
}