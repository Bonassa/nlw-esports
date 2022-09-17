
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface ButtonCheckProps extends ToggleGroup.ToggleGroupItemProps {
  checked: boolean
}

export default function ButtonCheck(props: ButtonCheckProps){
  return(
    <ToggleGroup.Item
      className={`w-10 h-10 rounded ${props.checked === true ? 'bg-violet-500' : 'bg-zinc-900'}`}
      type='button'
      {...props}
    >
      {props.children}
    </ToggleGroup.Item>
  );
}