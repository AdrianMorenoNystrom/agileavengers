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
      },
      {
        id: 2,
        title: "Projects",
        url: "/projects",
      },
      {
        id: 3,
        title: "Users",
        url: "",
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
      },
      {
        id: 2,
        title: "My History",
        url: "/timereports/history",
      },
      {
        id: 3,
        title: "All History",
        url: "/timereports/all-history",
      },
    ],
  },
  {
    id: 3,
    title: "admin",
    listItems: [
      {
        id: 1,
        title: "Add User",
        url: "/adduser",
      },
    ],
  },
];
