import { ReactNode } from "react"

export interface SidebarOption {
    icon: ReactNode
    name: string
    isActive: boolean
    onClick: () => void
}

export interface MenuProps {
    data: SidebarOption[]
}