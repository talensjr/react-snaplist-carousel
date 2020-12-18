import React, { useRef, useEffect } from 'react';

import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
  useKeyboardToScroll,
} from 'react-snaplist-carousel';

import styles from './styles.module.css';

const Item = ({ onClick, children, visible, isDragging, ...props }) => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (visible && elementRef.current) {
      elementRef.current.focus();
    }
  }, [visible]);

  return (
    <div
      ref={elementRef}
      tabIndex={visible ? 0 : -1}
      className={styles.item}
      style={{
        background: visible ? '#bce6fe' : '#cccccc',
        cursor: visible | isDragging ? 'inherit' : 'pointer',
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const A11y = () => {
  const snapList = useRef(null);

  const visible = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element);
  const goToChildren = useScroll({ ref: snapList });
  const { isDragging } = useDragToScroll({ ref: snapList });
  const { isDisabled, enable, disable } = useKeyboardToScroll({ ref: snapList });

  return (
    <div
      className={styles.wrapper}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <SnapList
        ref={snapList}
        direction="horizontal"
        role="region"
        aria-label="color picker"
        aria-roledescription="carousel"
      >
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(0)}
            visible={visible === 0}
            isDragging={isDragging}
            aria-label="item 1 of 5"
          >
            Item 0
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => {
              goToChildren(1);
              isDisabled ? enable() : disable();
            }}
            visible={visible === 1}
            isDragging={isDragging}
            aria-label="item 2 of 5"
          >
            Item 1
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(2)}
            visible={visible === 2}
            isDragging={isDragging}
            aria-label="item 3 of 5"
          >
            Item 2
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(3)}
            visible={visible === 3}
            isDragging={isDragging}
            aria-label="item 4 of 5"
          >
            Item 3
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(4)}
            visible={visible === 4}
            isDragging={isDragging}
            aria-label="item 5 of 5"
          >
            Item 4
          </Item>
        </SnapItem>
      </SnapList>
    </div>
  );
};
