import { RefObject, useEffect, useState } from 'react';
import { useScroll } from './useScroll';
import { getVisibleChildren } from './useVisibleElements';

export const useKeyboardToScroll = ({
  ref,
  disable = false,
}: {
  ref: RefObject<HTMLDivElement>;
  disable?: boolean;
}) => {
  const [disabled, setDisabled] = useState(disable);
  const goToChildren = useScroll({ ref });
  useEffect(() => {
    const $viewport: HTMLDivElement | null = ref.current;
    if (!$viewport || disabled) return;
    const $items = $viewport.children;
    const totalItems = $items.length;
    const keyDownHandler = (e: KeyboardEvent) => {
      const currentElement = getVisibleChildren($viewport).children[0];
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        goToChildren(currentElement < totalItems - 1 ? currentElement + 1 : currentElement);
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        goToChildren(currentElement > 0 ? currentElement - 1 : currentElement);
      }
    };
    if ($viewport) {
      $viewport.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      if ($viewport) {
        $viewport.removeEventListener('keydown', keyDownHandler);
      }
    };
  }, [ref, goToChildren, disabled]);
  return {
    enable: () => setDisabled(false),
    disable: () => setDisabled(true),
    isDisabled: disabled,
  };
};
