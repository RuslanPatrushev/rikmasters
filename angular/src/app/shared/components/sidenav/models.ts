export interface SideNav {
    groups: Array<MenuGroup>,
    groupsMobile: Array<MenuGroup>
}

export interface MenuGroup {
    name: string;
    icon?: string;
    subGroups?: Array<MenuGroup>;
    class?: string;
    isMenu?: boolean;
}
