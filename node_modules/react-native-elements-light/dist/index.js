// UI references
// https://ionicframework.com/docs/components/#buttons
// https://material.io/guidelines/components/buttons.html#buttons-raised-buttons
// https://material.angularjs.org/latest/demo/button
// Core
import Button from './buttons/Button';
import Chip from './buttons/Chip';
import Input from './input/Input';
import Overlay from './overlay/Overlay';
// Utilities
import Badge from './badge/Badge';
import withBadge from './badge/withBadge';
import CheckBox from './checkbox/CheckBox';
import Divider from './divider/Divider';
// Productivity
import Card from './card/Card';
import Dialog from './dialog/Dialog';
import Header from './header/Header';
import Tooltip from './tooltip/Tooltip';
import BottomSheet from './bottomSheet/BottomSheet';
import LinearProgress from './linearProgress';
import Tab from './tab/Tab';
import TabView from './tab/TabView';
// helpers
import { colors, ThemeProvider, ThemeConsumer, ThemeContext, withTheme, makeStyles, useTheme, } from './config';
import normalize from './helpers/normalizeText';
export { Badge, BottomSheet, Button, Card, Chip, Input, LinearProgress, Tooltip, Divider, Dialog, CheckBox, colors, normalize, Header, Overlay, ThemeProvider, ThemeConsumer, ThemeContext, withBadge, withTheme, useTheme, makeStyles, Tab, TabView, };
