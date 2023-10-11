import {PropsWithChildren} from 'react';
import {View} from 'react-native';

type SectionProps = PropsWithChildren;

export const Section = ({children}: SectionProps) => {
  return <View>{children}</View>;
};
