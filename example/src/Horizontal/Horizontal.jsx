import React, { useRef } from 'react';

import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
  useKeyboardToScroll,
} from 'react-snaplist-carousel';

import styles from './styles.module.css';

const Item = ({ onClick, children, visible, isDragging, ...props }) => (
  <div
    {...props}
    className={styles.item}
    style={{
      background: visible ? '#bce6fe' : '#cccccc',
      cursor: visible | isDragging ? 'inherit' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

export const Horizontal = () => {
  const snapList = useRef(null);

  const visible = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element);
  const goToChildren = useScroll({ ref: snapList });
  const { isDragging } = useDragToScroll({ ref: snapList });
  useKeyboardToScroll({ ref: snapList });

  return (
    <div
      className={styles.wrapper}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <SnapList ref={snapList} direction="horizontal" tabIndex={0}>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(0)}
            visible={visible === 0}
            // tabIndex={visible === 0 ? 0 : -1}
            isDragging={isDragging}
          >
            Item 0
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(1)}
            visible={visible === 1}
            // tabIndex={visible === 1 ? 0 : -1}
            isDragging={isDragging}
          >
            Item 1
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(2)}
            visible={visible === 2}
            // tabIndex={visible === 2 ? 0 : -1}
            isDragging={isDragging}
          >
            Item 2
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(3)}
            visible={visible === 3}
            // tabIndex={visible === 3 ? 0 : -1}
            isDragging={isDragging}
          >
            Item 3
          </Item>
        </SnapItem>
        <SnapItem margin={{ left: '15px', right: '15px' }} width="60%" snapAlign="center">
          <Item
            onClick={() => goToChildren(4)}
            visible={visible === 4}
            // tabIndex={visible === 4 ? 0 : -1}
            isDragging={isDragging}
          >
            Item 4
          </Item>
        </SnapItem>
      </SnapList>
    </div>
  );
};
