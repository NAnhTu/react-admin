type FlexProps = {
  className?: string;
  alignItems?: string;
  flexDirection?: string;
  justifyContent?: string;
  mobileFlex?: boolean;
  children: JSX.Element | JSX.Element[];
};

const Flex = (props: FlexProps) => {
  const {
    children,
    className = '',
    alignItems,
    justifyContent,
    mobileFlex = true,
    flexDirection = 'row',
  } = props;
  const getFlexResponsive = () => (mobileFlex ? 'd-flex' : 'd-md-flex');
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? 'flex-' + flexDirection : ''
      } ${alignItems ? 'align-items-' + alignItems : ''} ${
        justifyContent ? 'justify-content-' + justifyContent : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Flex;
