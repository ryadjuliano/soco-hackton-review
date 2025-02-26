import { isWeb } from '~global/screens';
import Colors from '@/components/Colors';
import variables from '@/components/styles/variables';

const red = {
  Button: {
    buttonStyle: {
      backgroundColor: Colors.red0,
    },
    titleStyle: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'satoshi-bold',
      lineHeight: 19,
    },
    disabledStyle: {
      backgroundColor: Colors.grey0,
    },
    disabledTitleStyle: {
      color: Colors.white,
    },
  },
};

const purple = {
  Button: {
    buttonStyle: {
      backgroundColor: Colors.purple4,
      borderColor: Colors.purple4,
      borderRadius: 18,
      ...(isWeb && { cursor: 'pointer' }),
    },
    titleStyle: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'satoshi-black',
      lineHeight: 19,
    },
    disabledStyle: {
      backgroundColor: Colors.grey0,
    },
    disabledTitleStyle: {
      color: Colors.white,
    },
  },
};

const purpleDark = {
  Button: {
    buttonStyle: {
      backgroundColor: Colors.purple7,
    },
    titleStyle: {
      color: Colors.white,
      fontSize: 12,
      fontFamily: 'satoshi-black',
      lineHeight: 15,
    },
    disabledStyle: {
      backgroundColor: Colors.grey0,
    },
    disabledTitleStyle: {
      color: Colors.white,
    },
  },
};

const purpleSmall = {
  Button: {
    buttonStyle: {
      ...purple.Button.buttonStyle,
      paddingVertical: 4,
      paddingHorizontal: 12,
    },
    titleStyle: {
      ...purple.Button.titleStyle,
      fontSize: 12,
      lineHeight: 16,
    },
    disabledStyle: purple.Button.disabledStyle,
    disabledTitleStyle: purple.Button.disabledTitleStyle,
  },
};

const purpleOutline = {
  Button: {
    buttonStyle: {
      backgroundColor: 'transparent',
      borderColor: Colors.purple4,
      borderWidth: 1,
      borderRadius: 18,
    },
    titleStyle: {
      color: Colors.purple7,
      fontSize: 14,
      fontFamily: 'satoshi-bold',
      lineHeight: 19,
    },
    disabledStyle: {
      borderColor: Colors.grey0,
      backgroundColor: 'transparent',
    },
    disabledTitleStyle: {
      color: Colors.grey2,
    },
  },
};

const purpleLight = {
  Button: {
    buttonStyle: {
      backgroundColor: '#f1ebfa',
      borderColor: '#f1ebfa',
      borderWidth: 1,
      borderRadius: 18,
    },
    titleStyle: {
      color: Colors.grey2,
      fontSize: 14,
      fontFamily: 'satoshi-bold',
      lineHeight: 19,
    },
    disabledStyle: {
      borderColor: Colors.grey0,
      backgroundColor: 'transparent',
    },
    disabledTitleStyle: {
      color: Colors.grey2,
    },
  },
};

const purpleClearIcon = {
  Button: {
    type: 'clear',
    buttonStyle: {
      padding: 0,
    },
    titleStyle: {
      color: Colors.purple0,
      fontSize: 12,
      fontFamily: 'satoshi-bold',
    },
    loadingProps: {
      color: Colors.purple0,
    },
  },
};

const purpleClearLink = {
  Button: {
    type: 'clear',
    buttonStyle: {
      padding: 0,
    },
    titleStyle: {
      color: Colors.purple0,
      fontSize: 13,
      fontFamily: 'satoshi-bold',
      lineHeight: 18,
    },
  },
};

export {
  red,
  purple,
  purpleDark,
  purpleSmall,
  purpleLight,
  purpleOutline,
  purpleClearIcon,
  purpleClearLink,
};

export const buttons = (size = 'base', variant = 'purple') => {
  return {
    button: {
      ...Object.assign(
        {},
        variables[`border-radius-${size}`],
        variables[`padding-${size}`],
        variables[`button-${variant}-bg`],
      ),
    },
    buttonText: {
      fontFamily: 'satoshi-black',
      textAlign: 'center',
      textTransform: 'uppercase',
      ...Object.assign(
        {},
        variables[`button-${variant}-color`],
        variables[`font-size-${size}`],
      ),
    },
  };
};
