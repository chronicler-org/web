import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#009AFA',
    colorBgBase: '#15191e',
    colorTextPlaceholder: '#a6adbb',
  },
  components: {
    Input: {
      controlHeightLG: 48,
      inputFontSizeLG: 16,
    },
    Select: {
      controlHeightLG: 48,
    },
    Button: {
      controlHeightLG: 48,
    },
    Badge: {
      statusSize: 24,
    },
    ColorPicker: {
      controlHeightLG: 48,
    },
    DatePicker: {
      controlHeightLG: 48,
    },
  },
};
