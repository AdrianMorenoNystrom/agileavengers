// Array of menu items

export const menuData = [
    {
        id: 1,
        title: "main",
        listItems: [
            {
                id: 1,
                title: "Dashboard",
                url: "/",
                icon: "LayoutDashboard"
            },
            {
                id: 2,
                title: "Projects",
                url: "/projects",
                icon: "NotepadText"
            },
            {
                id: 3,
                title: "Users",
                url: "/people",
                icon: "users"
            },
        ],
    },
    {
        id: 2,
        title: "user",
        listItems: [
            {
                id: 1,
                title: "Report time",
                url: "/timereport",
                icon: "calendar-check"
            },
        ],
    },
    {
        id:3,
        title:"admin",
        listItems: [
            {
                id:1,
                title:"Add User",
                url: "/adduser",
                icon:"SmilePlus"
            },
        ],
    },
]