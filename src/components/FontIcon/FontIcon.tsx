import React, { memo, useMemo } from 'react';

type IconName = 'cross' | 'check' | 'left-arrow' | 'right-arrow' | 'logout';
interface IFontIconsProps {
  name: IconName;
}
const FontIcon: React.FC<IFontIconsProps> = (props) => {
  const { name } = props;
  const className = useMemo(() => {
    return `icon-${name}`;
  }, [name]);

  return <i className={className} />;
};

export default memo(FontIcon);
