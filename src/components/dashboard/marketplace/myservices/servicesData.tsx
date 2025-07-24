
export interface Bid {
    id: number;
    name: string;
    role: string;
    description: string;
    dateBided: string;
    imageUrl:string;
}

export const MyServices: Bid[] = [
    {
        id: 1,
        name: "Bid One",
         role: 'Featured',
        description: "This is a description for bid one.",
        dateBided: "2024-10-18",
        imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        id: 2,
        name: "Bid Two",
        role: 'Featured',
        description: "This is a description for bid two.",
        dateBided: "2024-10-17",
        imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        id: 3,
        name: "Bid Three",
        role: 'Featured',
        description: "This is a description for bid three.",
        dateBided: "2024-4-14",
        imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },

];
