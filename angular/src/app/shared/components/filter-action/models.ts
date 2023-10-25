export interface FilterAction  {
    buttons: {
        add: Button,
        unlock: Button,
        blocked: Button,
        filter: Button,
    },
    form: {
        title: string,
        filterCards: {
            login: FilterCard,
            phone: FilterCard,
            createAt: FilterCard,
            status: FilterCard,
            email: FilterCard,
            isAdmin: FilterCard,
            updateAt: FilterCard
        },
        buttons: {
            apply: Button,
            cancel: Button,
            reset: Button
        }
    }
}

interface Button {
    label: string,
    icon?: string
}

interface FilterCard {
    title: string,
    icon?: string,
    errorText?: string,
    options?: string[]
}
