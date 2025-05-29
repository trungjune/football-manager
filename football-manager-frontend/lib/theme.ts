import type { ThemeConfig } from "antd";

// Cấu hình theme cho Ant Design
export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: "#1677ff",
      algorithm: true,
    },
    Input: {
      colorPrimary: "#1677ff",
    },
    Select: {
      colorPrimary: "#1677ff",
    },
    Table: {
      colorPrimary: "#1677ff",
    },
    Menu: {
      colorPrimary: "#1677ff",
    },
    Layout: {
      colorBgHeader: "#001529",
      colorBgBody: "#f0f2f5",
      colorBgTrigger: "#002140",
    },
  },
};
