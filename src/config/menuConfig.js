const menuList = [
  {
    title: "首页",
    icon: "HomeFilled",
    to: "/home",
  },
  {
    title: "商品",
    icon: "AppstoreFilled",
    to: "/products",
    children: [
      {
        title: "品类管理",
        icon: "FolderFilled",
        to: "/category",
      },
      {
        title: "商品管理",
        icon: "GiftFilled",
        to: "/product",
      },
    ],
  },
  {
    title: "用户管理",
    icon: "UserOutlined",
    to: "/user",
  },
  {
    title: "角色管理",
    icon: "UsergroupAddOutlined",
    to: "/role",
  },
  {
    title: "图形表",
    icon: "DeploymentUnitOutlined",
    to: "/charts",
    children: [
      {
        title: "柱形图",
        icon: "SlidersFilled",
        to: "/charts/bar",
      },
      {
        title: "折线图",
        icon: "FundFilled",
        to: "/charts/line",
      },
      {
        title: "饼图",
        icon: "PieChartFilled",
        to: "/charts/pie",
      },
    ],
  },
];

export default menuList;
