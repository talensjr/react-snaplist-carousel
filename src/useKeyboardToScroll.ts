import { RefObject, useEffect } from 'react';
import { useScroll } from './useScroll';
import { getVisibleChildren } from './useVisibleElements';

export const useKeyboardToScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const goToChildren = useScroll({ ref });
  useEffect(() => {
    const $viewport: HTMLDivElement | null = ref.current;
    if (!$viewport) return;
    const $items = $viewport.children;
    const totalItems = $items.length;
    const keyDownHandler = (e: KeyboardEvent) => {
      console.log('ev');
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
  }, [ref, goToChildren]);
  return '';
};
