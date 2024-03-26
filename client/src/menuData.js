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
        icon: "LayoutDashboard",
      },
      {
        id: 2,
        title: "Projects",
        url: "/projects",
        icon: "NotepadText",
      },
      {
        id: 3,
        title: "Users",
        url: "",
        icon: "users",
      },
    ],
  },
  {
    id: 2,
    title: "Time Reports",
    listItems: [
      {
        id: 1,
        title: "Report Time",
        url: "/timereport",
        icon: "calendar-clock",
      },
      {
        id: 2,
        title: "History",
        url: "/timereports/history",
        icon: "History",
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
];