import { Column } from "./Column"

export interface BoardInput {
    name: string
    columns: Column[]
}

export interface Board {
    name: string
}