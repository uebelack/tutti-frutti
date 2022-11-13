// eslint-disable-next-line import/no-named-default
import { default as ReactSwitch } from 'react-switch';

export interface SwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  className?: string;
}

export const Switch = ({ onChange, checked, className }: SwitchProps) => (
  <ReactSwitch
    onChange={onChange}
    checked={checked}
    className={className}
    offColor="#F6EDFF"
    onColor="#381E72"
    offHandleColor="#D0BCFF"
    onHandleColor="#ffffff"
    uncheckedIcon={false}
    checkedIcon={false}
    width={48}
    handleDiameter={20}
  />
);

export default Switch;
